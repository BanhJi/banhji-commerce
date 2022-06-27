<template>
    <v-container fluid class="sale-container py-0">
        <v-row>
            <v-col sm="12" cols="12" class="pb-0">
                <v-card color="#f8f8f9" class="pa-0 no_border" elevation="0">
                    <LoadingMe
                        :isLoading="loadPullData"
                        :fullPage="false"
                        :myLoading="true" />
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true" />
                    <v-row>
                        <v-col md="2" cols="2" class="pa-0 sidebar-left hidden-sm-and-down">
                            <div class="d-flex flex-column" style="height: 98vh;background-color: rgb(248 248 249);">
                                <div sm="12" cols="12" class=" flex-1">
                                    <v-card flat color="" style="background-color: rgb(248 248 249);">
                                        <span class="hidden-sm-and-down">
                                            <a class="main_logo  d-flex pl-6 py-3" style="background-color: rgb(248 248 249);">
                                            <div class="mb-0">
                                                <img
                                                    src="@/assets/images/banhji-logo-r.png"
                                                    width="100%"
                                                    height="auto"
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
                                            
                                            <div v-if="g.allowSelectCustomer" class="v-list-item v-list-item-left  d-block mr-0 pr-0">
                                                
                                                <v-col cols="12" class="py-0">
                                                    <v-row>
                                                        <v-text-field
                                                        class="pl-2"
                                                        outlined
                                                        :placeholder="$t('search')"
                                                        clearable
                                                        style="width: 50px"/>
                                                        <v-btn class=" rounded-0 ml-1" color="primary" style="min-width: 25px">
                                                            <i  class=" b-search" />
                                                        </v-btn>
                                                    </v-row>
                                                </v-col>
                                            
                                            </div>
                                            
                                            <div class="v-list-item v-list-item-left  d-block mr-0">
                                                <span class="pl-2 dark_grey">{{$t('customer_name')}}</span> <br>
                                                <h2 class="pl-2">{{customer.name}}</h2>
                                            </div>
                                            <div class="v-list-item v-list-item-left  d-block mr-0">
                                                <span class="pl-2 dark_grey">{{$t('points')}}</span><br>
                                                <h2 class="pl-2 border-b">{{customerPoint}}</h2>
                                            </div>
                                            <!-- <div class="v-list-item v-list-item-left  d-block mr-0">
                                                <span class="pl-2 dark_grey">{{$t('loyalty_program')}}</span><br>
                                                <h2 class="pl-2 border-b">10%</h2>
                                            </div>
                                            <div class="v-list-item v-list-item-left  d-block mr-0">
                                                <span class="pl-2 dark_grey">{{$t('loyalty_num')}}</span><br>
                                                <h2 class="pl-2 border-b">123456789</h2>
                                            </div> -->
                                            <div class="v-list-item v-list-item-left  d-block mr-0">
                                                <span class="pl-2 dark_grey">{{$t('cashier_name')}}</span><br>
                                                <h2 class="pl-2 border-b">{{activePin.name}}</h2>
                                            </div>
                                        <v-divider />

                                            <div class="v-list-item v-list-item-left  d-block mr-0 pt-2" style="">
                                                <span class="pl-2 dark_grey">{{$t('partner')}}</span><br>
                                                <h2 class="pl-2 border-b  primary--text">foodpada</h2>
                                            </div>
                                            <div class="v-list-item  v-list-item-left d-block mr-0" style="">
                                                <span class="pl-2 dark_grey">{{$t('order_number')}}</span><br>
                                                <h2 class="pl-2 border-b  primary--text">12345678</h2>
                                            </div>
                                            <div class="v-list-item  v-list-item-left d-block mr-0" style="">
                                                <span class="pl-2 dark_grey">{{$t('price_level')}}</span><br>
                                                <v-select
                                                    class="mt-1"
                                                    v-model="g.defaultPriceLevel"
                                                    :items="priceLevels"
                                                    :disabled="!g.allowSelectPriceLevel"
                                                    item-value="id"
                                                    item-text="name"
                                                    placeholder="Price Level"
                                                    tage="Default Price Level"
                                                    outlined
                                                />
                                            </div>
                                            <div class="v-list-item v-list-item-left  d-block mb-1 mr-0 pr-1 mt-0" style="min-height: 40px;">
                                                <v-row class="ml-1 mr-1" style="cursor: pointer;">
                                                    <template>
                                                        <div justify="center" style="height: 100%;width:100%">
                                                            <v-dialog
                                                                v-model="dialogParksale"
                                                                fullscreen
                                                                hide-overlay
                                                                transition="dialog-bottom-transition"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-col  v-bind="attrs" v-on="on" sm="12" 
                                                                        cols="12" class="py-2"
                                                                        style=" background-color: #fff;border-radius: 5px;">

                                                                        <span class="font_14 text-bold text-uppercase">{{$t('parksale')}}</span>
                                                                        <h2 class="notification px-2 font_14 ml-2 float-right" style="border-radius: 5px;">20</h2>
                                                                    </v-col>
                                                                </template>
                                                                <v-card style="background-color: #f8f8f9;">
                                                                    <v-container>
                                                                        <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                            <div class="modal_header">
                                                                                <v-card-title>{{ $t("parksale") }}</v-card-title>
                                                                                <v-icon
                                                                                    @click="dialogParksale = false"
                                                                                    style="cursor: pointer; font-size: 40px;"
                                                                                    color="grey"
                                                                                    class="float-right mt-n1">close
                                                                                </v-icon>
                                                                            </div>
                                                                            <v-card-text class="modal_text_content">
                                                                                <Parksale/>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </div>
                                                    </template>
                                                </v-row>
                                            </div>
                                            <div class="v-list-item v-list-item-left  d-block mb-1 mr-0" style="min-height: 40px;">
                                                <v-row class="ml-1 mr-1" style="cursor: pointer;">
                                                    <template>
                                                        <div justify="center" style="height: 100%;width:100%">
                                                            <v-dialog
                                                                v-model="dialogInvoice"
                                                                fullscreen
                                                                hide-overlay
                                                                transition="dialog-bottom-transition"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-col  v-bind="attrs" v-on="on" sm="12" 
                                                                        cols="12" class="py-2"
                                                                        style=" background-color: #fff;border-radius: 5px;">

                                                                        <span class="font_14 text-bold text-uppercase">{{$t('invoice')}}</span>
                                                                        <h2 class="notification px-2 font_14 ml-2 float-right" style="border-radius: 5px;">20</h2>
                                                                    </v-col>
                                                                </template>
                                                                <v-card style="background-color: #f8f8f9;">
                                                                    <v-container>
                                                                        <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                            <div class="modal_header">
                                                                                <v-card-title>{{ $t("invoice") }}</v-card-title>
                                                                                <v-icon
                                                                                    @click="dialogInvoice = false"
                                                                                    style="cursor: pointer; font-size: 40px;"
                                                                                    color="grey"
                                                                                    class="float-right mt-n1">close
                                                                                </v-icon>
                                                                            </div>
                                                                            <v-card-text class="modal_text_content">
                                                                                <InvoiceReport/>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </div>
                                                    </template>
                                                </v-row>
                                            </div>
                                            <div class="v-list-item v-list-item-left  d-block mb-1 mr-0 pr-1" style="min-height: 40px;">
                                                <v-row class="ml-1 mr-1" style="cursor: pointer;">
                                                    <template>
                                                        <div justify="center" style="height: 100%;width:100%">
                                                            <v-dialog
                                                                v-model="dialogOrderReport"
                                                                fullscreen
                                                                hide-overlay
                                                                transition="dialog-bottom-transition"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-col  v-bind="attrs" v-on="on" sm="12" 
                                                                        cols="12" class="py-2"
                                                                        style=" background-color: #fff;border-radius: 5px;">

                                                                        <span class="font_14 text-bold text-uppercase">{{$t('order')}}</span>
                                                                        <h2 class="notification px-2 font_14 ml-2 float-right" style="border-radius: 5px;">20</h2>
                                                                    </v-col>
                                                                </template>
                                                                <v-card style="background-color: #f8f8f9;">
                                                                    <v-container>
                                                                        <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                            <div class="modal_header">
                                                                                <v-card-title>{{ $t("order") }}</v-card-title>
                                                                                <v-icon
                                                                                    @click="dialogOrderReport = false"
                                                                                    style="cursor: pointer; font-size: 40px;"
                                                                                    color="grey"
                                                                                    class="float-right mt-n1">close
                                                                                </v-icon>
                                                                            </div>
                                                                            <v-card-text class="modal_text_content">
                                                                                <OrderReport/>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                    </v-container>
                                                                </v-card>
                                                            </v-dialog>
                                                        </div>
                                                    </template>
                                                </v-row>
                                            </div>

                                            <!-- <div class="v-list-item d-block ma-3 mb-0 mr-0 v-divider"></div> -->

                                            <div class="v-list-item v-list-item-left  d-block mr-0 pt-2">
                                                <v-row>
                                                    <v-col md="6" cols="12" class="pr-0">
                                                        <small class="pl-2 dark_grey">{{$t('operator')}}</small><br>
                                                        <small class="pl-2">{{session.name}}</small>
                                                    </v-col>
                                                    <v-col md="6" cols="12" class="px-0">
                                                        <small class="pl-2 dark_grey">{{$t('session')}}</small><br>
                                                        <small class="pl-2">{{session.startDate}}</small>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                            
                                            
                                        </div>
                                    </v-card>
                                </div>
                                <div sm="12" cols="12" class="">
                                    <v-card flat color="" style="background-color: rgb(248 248 249);">
                                        <div
                                            class="">
                                            <img
                                            class="mt-1 v-list-item v-list-item-left "
                                            src="@/assets/images/made_in_cambodia.png"
                                            width="100%"
                                            height="auto"
                                            alt=""
                                            />
                                            <v-divider />
                                            <div class=" v-list-item py-1">
                                                <p class="mb-0 font_14 mt-3 pl-2">
                                                    © {{ year }} {{ $t("banhji_name_desc") }}
                                                </p>
                                            </div>
                                        </div>
                                    </v-card>
                                </div>
                            </div>
                        </v-col>
                        <!-- function -->
                        <v-col md="5" sm="12" cols="12" class="py-0 ">
                            <div class="" style="height: 98vh;background-color: #ffff;display: flex; flex-direction: column;">
                                <!-- sale transation -->
                                <div  class="" style="flex-grow: 1; overflow-y: scroll;overflow-x: hidden;" >
                                    <v-card color="white" class="px-2 no_border" elevation="0">
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pt-3 pb-0">
                                                <h2 class="mb-1 font_20">{{ $t('customer_order') }}</h2>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="py-0" style="">
                                                <template>
                                                    <kendo-datasource 
                                                        ref="lineDS"
                                                        :type="'JSON'"
                                                        :data="lineDS"
                                                        :server-paging="false"
                                                    />
                                                    <kendo-grid 
                                                        id="lineDS" 
                                                        class="grid-function"
                                                        :data-source-ref="'lineDS'"
                                                        :editable="false"
                                                        :groupable="false"
                                                        :column-menu="false"
                                                        :noRecords="true"
                                                        :change="lineChange"
                                                        :selectable="true"
                                                        :scrollable-virtual="true">
                                                        <kendo-grid-column
                                                            :command="{
                                                                iconClass: 'k-icon k-i-trash',
                                                                text: ' ',
                                                                click: removeRow,
                                                                className: 'btn-plus isEditable',
                                                            }"
                                                            :title="''"
                                                            :width="63"
                                                            :headerAttributes="{
                                                                style:
                                                                'text-align: left; background-color: #EDF1F5',
                                                            }"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'description'"
                                                            :title="$t('description')"
                                                            :width="150"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                        <kendo-grid-column
                                                            :field="'qty'"
                                                            :title="$t('qty')"
                                                            :width="100"
                                                            :attributes="{ style: 'text-align: center' }"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                        <kendo-grid-column
                                                            :field="'price'"
                                                            :title="$t('price')"
                                                            :width="100"
                                                            :attributes="{ style: 'text-align: right' }"
                                                            :template="'<span>#=kendo.toString(price || 0, decimalFormat)#</span>'"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                        <kendo-grid-column
                                                            :field="'discountAmount'"
                                                            :title="`Dis.`"
                                                            :template="'<span>#=kendo.toString(discountAmount || 0, decimalFormat)#</span>'"
                                                            :width="100"
                                                            :attributes="{ style: 'text-align: right' }"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                        <kendo-grid-column
                                                            :field="'amount'"
                                                            :title="$t('amount')"
                                                            :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                                                            :width="100"
                                                            :attributes="{ style: 'text-align: right' }"
                                                            :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                    </kendo-grid>
                                                </template>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </div>
                                <!-- loyalty pop up -->
                                <div sm="3" cols="12" class="ml-8" hidden>
                                   
                                    <!-- loyalty -->
                                    <template>
                                        <v-row>
                                            <v-dialog
                                                v-model="dialogLoyalty"
                                                persistent
                                                max-width="350px"
                                                >
                                                <v-card>
                                                    <div class="modal_header">
                                                        <v-card-title>{{ $t("loyalty") }}</v-card-title>
                                                        <v-icon
                                                            @click="dialogLoyalty = false"
                                                            style="cursor: pointer; font-size: 30px;"
                                                            color="grey"
                                                            class="float-right mt-n1">close
                                                        </v-icon>
                                                    </div>
                                                    <v-col md="12" col="12" class="function_content pa-3">
                                                        <v-row>
                                                            <v-col sm="12" cols="12" class="pb-0">
                                                                <v-text-field
                                                                :label="$t('card_number')"
                                                                required
                                                                outlined
                                                                append-icon="mdi-credit-card-settings-outline"
                                                                type="number"
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col sm="12" cols="12" class="pt-1">
                                                                <v-select
                                                                :items="['A choen', 'pheaktra', 'Ly heang', 'Nimol']"
                                                                :label="$t('customer')"
                                                                outlined
                                                                append-icon="mdi-account"
                                                                required
                                                                ></v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-card-actions>
                                                        <div class="function_footer text-right">
                                                            <v-btn color="secondary" class="mr-2 white--text text-capitalize"
                                                                @click="skipLoyalty()">
                                                                {{ $t('skip') }}
                                                            </v-btn>
                                                            <v-btn color="primary" class="float-right white--text text-capitalize"
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
                                    <!-- partner -->
                                    <template>
                                        <v-row>
                                            <v-dialog
                                                v-model="dialogPartner"
                                                persistent
                                                max-width="450px"
                                                >
                                                <v-card>
                                                    <div class="modal_header">
                                                        <v-card-title>{{ $t("partner") }}</v-card-title>
                                                        <v-icon
                                                            @click="dialogPartner = false"
                                                            style="cursor: pointer; font-size: 30px;"
                                                            color="grey"
                                                            class="float-right mt-n1">close
                                                        </v-icon>
                                                    </div>
                                                    <v-col md="12" col="12" class="function_content pa-3">
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
                                                        <!-- <small>*indicates required field</small> -->
                                                    </v-col>
                                                    <v-card-actions>
                                                        <div class="function_footer">
                                                             <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                @click="skipPartner">
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
                                                max-width="350px"
                                                >
                                                <v-card>
                                                    <div class="modal_header">
                                                        <v-card-title>{{ $t("order_number") }}</v-card-title>
                                                        <v-icon
                                                            @click="dialogOrder = false"
                                                            style="cursor: pointer; font-size: 30px;"
                                                            color="grey"
                                                            class="float-right mt-n1">close
                                                        </v-icon>
                                                    </div>
                                                    <v-col md="12" col="12" class="function_content pa-3">
                                                        <v-row>
                                                            <v-col sm="12" cols="12" style="background-color: antiquewhite;">
                                                                <h2 class="font_14">{{$t('partner')}}</h2>
                                                                <h2 class="font_18 primary--text">foodpada</h2>

                                                            </v-col>
                                                            <v-col md="12" cols="12" class="">
                                                                <v-text-field
                                                                :label="$t('number')"
                                                                required
                                                                outlined
                                                                append-icon="mdi-credit-card-settings-outline"
                                                                type="number"
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-card-actions>
                                                        <div class="function_footer text-right">
                                                            <v-btn color="secondary" class="white--text text-capitalize mr-2"
                                                                @click="skipPartner">
                                                                {{ $t('skip') }}
                                                            </v-btn>
                                                            <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                @click="enterPartner">
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
                                            <v-dialog 
                                                v-model="pinActivate"
                                                persistent 
                                                max-width="350px">
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
                                                            </div>
                                                        </div>
                                                        <!-- </v-container> -->
                                                    </template>
                                                </v-form>
                                            </v-dialog>
                                        </v-row>
                                    </template> 
                                </div>
                                <div  class="" style="">
                                    <v-row class="px-4">
                                        <v-col sm="12" cols="12" class="py-0" style="border-top: 1px solid lightblue;">
                                            <v-row>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('sub_total')}}</small>
                                                    <small class="float-right primary--text">{{numberFormat(invoice.subTotal)}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('discount')}}</small>
                                                    <small class="float-right primary--text">{{numberFormat(invoice.discountTotal)}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('reward')}}</small>
                                                    <small class="float-right primary--text">{{numberFormat(pointAmount)}}</small>
                                                </v-col>
                                                <v-col md="3" sm="3" col="3" class="pb-0">
                                                    <small class="dark_grey">{{$t('total_tax')}}</small>
                                                    <small class="float-right primary--text">{{numberFormat(invoice.totalTaxAmount)}}</small>
                                                </v-col>
                                            </v-row>
                                            <v-row class="mt-0">
                                                
                                                <v-col md="4" sm="4" col="4" class="pa-2 px-0 py-0">
                                                    <div class="ma-1 mr-0 pl-2">
                                                        <h2 class="font_20 mb-0">{{$t('total')}}</h2>
                                                    </div>
                                                </v-col>
                                                <v-col md="8" sm="8" col="8" class="pa-2 px-0 py-0">
                                                    <div class="ma-1 ml-0 pr-2" style="text-align: right;">
                                                        <h2 class="primary--text font_20 mb-0">{{numberFormat(invoice.total)}}</h2>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0">
                                            <v-row>
                                                <!-- reward -->
                                                <v-col md="3" v-show="func.reward" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogReward"
                                                            persistent
                                                            max-width="350px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-percent</v-icon>
                                                                    <span class="text-bold letter_spacing">{{$t('reward')}}</span>
                        
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("redeem_with") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogReward = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
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
                                                                                                <h2 class="font_22">{{$t('point')}}</h2>
                                                                                                <h2 class="font_22">{{$t('earn')}}</h2>
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
                                                                                                <h2 class="primary--text font_22">{{$t('point')}}</h2>
                                                                                                <h2 class="primary--text font_22">{{$t('purchase')}}</h2>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-list-item-content>
                                                                                </v-list-item>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
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
                                                                max-width="500px"
                                                                >
                                                                <v-card>
                                                                    <div class="modal_header">
                                                                        <v-card-title>{{ $t("apply_point") }}</v-card-title>
                                                                        <v-icon
                                                                            @click="rewardForm = false"
                                                                            style="cursor: pointer; font-size: 30px;"
                                                                            color="grey"
                                                                            class="float-right mt-n1">close
                                                                        </v-icon>
                                                                    </div>
                                                                    <v-col md="12" col="12" class="function_content pa-3">
                                                                        <v-row>
                                                                            <v-col cols="12" sm="12" md="12" class="">
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
                                                                            <v-col cols="12" sm="12" md="12" class="grayBg px-6 py-0 text-center">
                                                                                <v-row>
                                                                                    <v-col sm="5" cols="5" class="px-0">
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn ml-0">
                                                                                            5%
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn">
                                                                                            10%
                                                                                        </v-btn>

                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn ml-0">
                                                                                            15%
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn">
                                                                                            20%
                                                                                        </v-btn>
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn ml-0">
                                                                                            30%
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn">
                                                                                            40%
                                                                                        </v-btn>
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn ml-0">
                                                                                            50%
                                                                                        </v-btn>
                                                                                            
                                                                                        <v-btn color="primary" class="white--text rounded-0 apply-btn">
                                                                                            100%
                                                                                        </v-btn>
                                                                                        
                                                                                    </v-col>
                                                                                    <v-col sm="7" cols="7" class="px-0">
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
                                                                                            c
                                                                                        </v-btn>
                                                                                        
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-col>
                                                                    <v-card-actions>
                                                                        <div class="function_footer">

                                                                            <v-btn color="primary" class="float-right white--text text-capitalize"
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
                                                <!-- promotion -->
                                                <v-col md="3" v-show="func.promotion" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogPromotion"
                                                            persistent
                                                            max-width="500px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-ticket-percent</v-icon>
                                                                    <span class="text-bold letter_spacing">{{$t('promotion')}}</span>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("promotion") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogPromotion = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
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
                                                                        <v-col sm="4" cols="4" class="">
                                                                            <v-card
                                                                                class="mx-auto"
                                                                                max-width="500"
                                                                                outlined
                                                                                @click="ToPromotionForm()"
                                                                            >
                                                                                <template>
                                                                                    <v-simple-table>
                                                                                        <template>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td class="text-left tdbig px-2">
                                                                                                        <span class="niradei_medium font_12 grey--text">
                                                                                                            {{ $t("name") }}
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    <td class="text-left tdbig px-0">:</td>
                                                                                                    <td class="text-right  px-1">
                                                                                                        <span class="niradei_heavy font_12 dark_grey">
                                                                                                            khmer new year
                                                                                                        </span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td class="text-left tdbig  px-2">
                                                                                                        <span class="niradei_medium font_12 grey--text">
                                                                                                            {{ $t("code") }}
                                                                                                        </span>
                                                                                                    </td>
                                                                                                    <td class="text-left tdbig px-0 ">:</td>
                                                                                                    <td class="text-right  px-2">
                                                                                                        <span class="niradei_heavy font_12 dark_grey">
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
                                                                                                    <td class="text-left tdbig px-0">:</td>
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
                                                <!-- note -->
                                                <v-col md="3" v-show="func.note" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogNote"
                                                            persistent
                                                            max-width="350px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-note</v-icon>
                                                                     <span class="text-bold letter_spacing">{{$t('note')}}</span>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("note") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogNote = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row>
                                                                        <v-col sm="12" cols="12" class="">
                                                                            <v-select
                                                                            :items="['cancel', 'worng', 'change invoice']"
                                                                            :label="$t('note')"
                                                                            outlined
                                                                            append-icon="mdi-border-color"
                                                                            required
                                                                            ></v-select>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer">
                                                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                            @click="dialogNote = false">
                                                                            {{ $t('enter') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template> 
                                                </v-col>
                                                <!-- delivery -->
                                                <v-col md="3" v-show="func.delivery" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogDelivery"
                                                            persistent
                                                            max-width="350px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-bike-fast</v-icon>
                                                                     <span class="text-bold letter_spacing">{{$t('delivery')}}</span>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("delivery") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogDelivery = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row>
                                                                        <v-col sm="12" cols="12" class="">
                                                                            <v-select
                                                                            :items="['watphnom', 'toul tompong', 'chormchav']"
                                                                            :label="$t('address')"
                                                                            outlined
                                                                            append-icon="mdi-border-color"
                                                                            required
                                                                            ></v-select>
                                                                        </v-col>
                                                                        <v-col sm="12" cols="12" class="pt-0">
                                                                            <v-text-field
                                                                            :label="$t('phone_number')"
                                                                            outlined
                                                                            append-icon="mdi-phone"
                                                                            required
                                                                            type="number"
                                                                            ></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="12" class="pt-1">
                                                                            <v-menu
                                                                            v-model="menu2"
                                                                            :close-on-content-click="false"
                                                                            :nudge-right="40"
                                                                            offset-y
                                                                            min-width="auto"
                                                                            >
                                                                            <template v-slot:activator="{ on, attrs }">
                                                                                <v-text-field
                                                                                v-model="date"
                                                                                label="time to completion"
                                                                                append-icon="mdi-calendar"
                                                                                outlined
                                                                                v-bind="attrs"
                                                                                v-on="on"
                                                                                ></v-text-field>
                                                                            </template>
                                                                            <v-date-picker
                                                                                v-model="date"
                                                                                @input="menu2 = false"
                                                                            ></v-date-picker>
                                                                            </v-menu>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer">
                                                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                            @click="dialogDelivery = false">
                                                                            {{ $t('enter') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template> 
                                                </v-col>
                                                <!-- parksale -->
                                                <v-col md="3" v-show="func.parksale" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0  btn-funtion" style="">
                                                        <v-icon left class="mr-0">mdi-parking</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('parksale')}}</span>
                                                    </v-btn>
                                                </v-col>
                                                <!-- invoice -->
                                                <v-col md="3" v-show="func.invoice" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0 btn-funtion" style="">
                                                        <v-icon left class="mr-0">mdi-receipt</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('invoice')}}</span>
                                                    </v-btn>
                                                </v-col>
                                                <!-- reset order -->
                                                <v-col md="3" v-show="func.resetOrder" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0 btn-funtion" style=""> 
                                                        <v-icon left class="mr-0">mdi-autorenew</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('reset_order')}}</span>
                                                    </v-btn>
                                                </v-col>
                                                <!-- OrderType -->
                                                <v-col md="3" v-show="func.orderType" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogOrderType"
                                                            persistent
                                                            max-width="350px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-percent</v-icon>
                                                                    <span class="text-bold letter_spacing">{{$t('order_type')}}</span>
                        
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("order_type") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogReward = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row v-for="d in g.orderTypes" v-bind:key="d.id">
                                                                        <v-col sm="6" cols="6" class="">
                                                                            <v-card
                                                                                class="mx-auto"
                                                                                max-width="465"
                                                                                outlined
                                                                                @click="enterOrderType(d)"
                                                                            >
                                                                                <v-list-item three-line>
                                                                                    <v-list-item-content class="pk-3">
                                                                                        <v-row>
                                                                                            <v-col sm="12" cols="12" class="text-center">
                                                                                                <h2 class="font_22">{{d.name}}</h2>
                                                                                                <h2 class="font_22">{{d.abbr}}</h2>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-list-item-content>
                                                                                </v-list-item>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer">
                                                                        <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                            @click="skipOrderType">
                                                                            {{ $t('skip') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template> 
                                                </v-col>
                                                <!-- split inv-->
                                                <v-col md="3" v-show="func.splitInv" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogSplit"
                                                            persistent
                                                            max-width="600px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-axis-arrow</v-icon>
                                                                     <span class="text-bold letter_spacing">{{$t('split_item')}}</span>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("split_item") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogSplit = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row>
                                                                        <v-col cols="6" class="py-0">
                                                                            <v-card color="white" class="pa-3 no_border" elevation="0" style="min-height: auto">
                                                                                <h2 class="font_20">{{$t('from')}}</h2>
                                                                                <v-list three-line class="list1">
                                                                                    <drop-list :items="items1" @reorder="$event.apply(items1)" @insert="insert1" mode="cut"  style="min-height: 300px;" >
                                                                                        <template v-slot:item="{item, reorder}">
                                                                                            <drag :key="item.title" :data="item" @cut="remove(items1, item)">
                                                                                                <v-list-item class="my-2" style="background-color: #e0e0e0!important; min-height: 0"
                                                                                                                :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                                                                                    <v-list-item-content>
                                                                                                        <v-list-item-title v-html="item.title"/>
                                                                                                    </v-list-item-content>
                                                                                                </v-list-item>
                                                                                            </drag>
                                                                                        </template>
                                                                                        <template v-slot:inserting-drag-image="{data}">
                                                                                            <v-list-item-avatar style="transform:translate(-50%, -50%) scale(1.5)">
                                                                                                <img :src="data.avatar">
                                                                                            </v-list-item-avatar>
                                                                                        </template>
                                                                                        <template v-slot:reordering-drag-image/>
                                                                                        <template v-slot:feedback="{data}">
                                                                                            <v-skeleton-loader
                                                                                                    type="list-item-avatar-three-line"
                                                                                                    :key="data.title"
                                                                                            />
                                                                                        </template>
                                                                                    </drop-list>
                                                                                </v-list>
                                                                            </v-card>
                                                                        </v-col>
                                                                        <v-col cols="6"  class="py-0">
                                                                            <v-card color="third" class="pa-3 no_border" elevation="0" style="min-height: 100%">
                                                                                <h2 class="text-white font_20">{{$t('to')}}</h2>
                                                                                <drop-list class="list2 py-2" :items="items2" @reorder="$event.apply(items2)" @insert="insert2"
                                                                                            mode="cut" style="min-height: 300px;">
                                                                                    <template v-slot:item="{item,reorder}">
                                                                                        <drag :key="item.title" class="chip my-2" :data="item" @cut="remove(items2, item)">
                                                                                            <!-- <v-chip class="py-2" :color="reorder ? 'primary' : null" style="border-radius: 0!important;width:100%;">{{item.title}}</v-chip> -->
                                                                                            <v-list-item class="my-2" style="background-color: #e0e0e0!important; min-height: 0"
                                                                                                            :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                                                                                <v-list-item-content>
                                                                                                    <v-list-item-title v-html="item.title"/>
                                                                                                </v-list-item-content>
                                                                                            </v-list-item>
                                                                                            
                                                                                        </drag>
                                                                                    </template>
                                                                                    <template v-slot:feedback="{data}">
                                                                                        <div class="chip" :key="data.title">
                                                                                            <v-chip color="primary" style="border-radius: 0!important;width:100%;">{{data.title}}</v-chip>
                                                                                        </div>
                                                                                    </template>
                                                                                    <template v-slot:inserting-drag-image="{data}">
                                                                                        <v-chip :key="data.title" style="transform: translate(-50%, -50%)">{{data.title}}
                                                                                        </v-chip>
                                                                                    </template>
                                                                                </drop-list>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer">
                                                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                            @click="dialogSplit = false">
                                                                            {{ $t('save') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template>
                                                </v-col>
                                                <!-- clear order -->
                                                <v-col md="3" v-show="func.clearOrder" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0 btn-funtion" style=""> 
                                                        <v-icon left class="mr-0">mdi-archive-outline</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('clear_order')}}</span>
                                                    </v-btn>
                                                </v-col>
                                                <!-- Sale Unit-->
                                                <v-col md="3" v-show="func.saleUnit" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0 btn-funtion" style=""> 
                                                        <v-icon left class="mr-0">mdi-line-scan</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('sale_unit')}}</span>
                                                    </v-btn>
                                                </v-col>
                                                <!-- count guest-->
                                                <v-col md="3" v-show="func.countGuest" sm="3" col="3" class="pa-1">
                                                     <template>
                                                        <v-dialog
                                                            v-model="dialogCountGuest"
                                                            persistent
                                                            max-width="750px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-account-group</v-icon>
                                                                    <span class="text-bold letter_spacing">{{$t('count_guest')}}</span>
                        
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("count_guest") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogCountGuest = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row>
                                                                        <v-col sm="6" cols="6" class="pl-8">
                                                                            <v-card
                                                                                class="mx-auto"
                                                                                max-width="750"
                                                                                outlined
                                                                            >
                                                                                <v-list-item three-line>
                                                                                    <v-list-item-content class="pk-3">
                                                                                        <v-row>
                                                                                            <v-col sm="12" cols="12" class="text-center">
                                                                                                <h2 class="font_22">{{$t('local')}}</h2>
                                                                                            </v-col>
                                                                                            <v-col sm="6" cols="6" class="text-center">
                                                                                                <img
                                                                                                    class="img-1"
                                                                                                    src="@/assets/images/khmer_man.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                                <h2 class="font_30 primary--text">{{guestCount.localMen}}</h2>
                                                                                                <div class="function_footer pt-0">
                                                                                                    <v-btn @click="guestIncLocalMen()" color="third" class="white--text text-capitalize">
                                                                                                        <v-icon dark >
                                                                                                            mdi-plus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                    <v-btn @click="guestDecLocalMen()" color="secondary" class="float-right white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-minus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                </div>
                                                                                            </v-col>
                                                                                            <v-col sm="6" cols="6" class="text-center">
                                                                                               <img
                                                                                                    class="img-1"
                                                                                                    src="@/assets/images/khmer_women.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                                <h2 class="font_30 primary--text">{{guestCount.localWomen}}</h2>
                                                                                                <div class="function_footer pt-0">
                                                                                                    <v-btn @click="guestIncLocalWomen()" color="third" class="white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-plus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                    <v-btn @click="guestDecLocalWomen()" color="secondary" class="float-right white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-minus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                </div>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-list-item-content>
                                                                                </v-list-item>
                                                                            </v-card>
                                                                        </v-col>
                                                                        <v-col sm="6" cols="6" class="pr-8">
                                                                            <v-card
                                                                                class="mx-auto"
                                                                                max-width="465"
                                                                                outlined
                                                                            >
                                                                                <v-list-item three-line>
                                                                                    <v-list-item-content class="pk-3">
                                                                                        <v-row>
                                                                                            <v-col sm="12" cols="12" class="text-center">
                                                                                                <h2 class="primary--text font_22">{{$t('foreigner')}}</h2>
                                                                                            </v-col>
                                                                                            <v-col sm="6" cols="6" class="text-center">
                                                                                                <img
                                                                                                    class="img-1"
                                                                                                    src="@/assets/images/foreigner_men.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                                <h2 class="font_30 primary--text">{{guestCount.forMen}}</h2>
                                                                                                <div class="function_footer pt-0">
                                                                                                    <v-btn @click="guestIncForMen()" color="primary" class="white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-plus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                    <v-btn @click="guestDecForMen()" color="secondary" class="float-right white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-minus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                </div>
                                                                                            </v-col>
                                                                                            <v-col sm="6" cols="6" class="text-center">
                                                                                               <img
                                                                                                    class="img-1"
                                                                                                    src="@/assets/images/foreigner_women.png"
                                                                                                    width="100%"
                                                                                                />
                                                                                                <h2 class="font_30 primary--text">{{guestCount.forWomen}}</h2>
                                                                                                <div class="function_footer pt-0">
                                                                                                    <v-btn @click="guestIncForWomen()" color="primary" class="white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-plus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                    <v-btn @click="guestDecForWomen()" color="secondary" class="float-right white--text text-capitalize">
                                                                                                        <v-icon dark>
                                                                                                            mdi-minus
                                                                                                        </v-icon>
                                                                                                    </v-btn>
                                                                                                </div>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-list-item-content>
                                                                                </v-list-item>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer text-right">
                                                                        <v-btn color="secondary" class="mr-2 white--text text-capitalize"
                                                                            @click="skipGuestCount">
                                                                            {{ $t('skip') }}
                                                                        </v-btn>

                                                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                            @click="enterGuestCount">
                                                                            {{ $t('enter') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template> 
                                                </v-col>
                                                <!-- merge inv-->
                                                <v-col md="3" v-show="func.mergeInv" sm="3" col="3" class="pa-1">
                                                    <template>
                                                        <v-dialog
                                                            v-model="dialogMerge"
                                                            persistent
                                                            max-width="600px"
                                                            >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn v-bind="attrs"  v-on="on" color=third class="white--text rounded-0 btn-funtion" style="">
                                                                    <v-icon left class="mr-0">mdi-arrow-collapse-all</v-icon>
                                                                     <span class="text-bold letter_spacing">{{$t('merge_inv')}}</span>
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <div class="modal_header">
                                                                    <v-card-title>{{ $t("merge_inoice") }}</v-card-title>
                                                                    <v-icon
                                                                        @click="dialogMerge = false"
                                                                        style="cursor: pointer; font-size: 30px;"
                                                                        color="grey"
                                                                        class="float-right mt-n1">close
                                                                    </v-icon>
                                                                </div>
                                                                <v-col md="12" col="12" class="function_content pa-3">
                                                                    <v-row>
                                                                        <v-col cols="6" class="py-0">
                                                                            <v-card color="white" class="pa-3 no_border" elevation="0" style="min-height: auto">
                                                                                <h2 class="font_20">{{$t('from')}}</h2>
                                                                                <v-list three-line class="list1">
                                                                                    <drop-list :items="merge1" @reorder="$event.apply(merge1)" @insert="insert3" mode="cut"  style="min-height: 300px;" >
                                                                                        <template v-slot:item="{item, reorder}">
                                                                                            <drag :key="item.title" :data="item" @cut="remove(merge1, item)">
                                                                                                <v-list-item class="my-2" style="background-color: #e0e0e0!important; min-height: 0"
                                                                                                                :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                                                                                    <v-list-item-content>
                                                                                                        <v-list-item-title v-html="item.title"/>
                                                                                                    </v-list-item-content>
                                                                                                </v-list-item>
                                                                                            </drag>
                                                                                        </template>
                                                                                        <template v-slot:inserting-drag-image="{data}">
                                                                                            <v-list-item-avatar style="transform:translate(-50%, -50%) scale(1.5)">
                                                                                                <img :src="data.avatar">
                                                                                            </v-list-item-avatar>
                                                                                        </template>
                                                                                        <template v-slot:reordering-drag-image/>
                                                                                        <template v-slot:feedback="{data}">
                                                                                            <v-skeleton-loader
                                                                                                    type="list-item-avatar-three-line"
                                                                                                    :key="data.title"
                                                                                            />
                                                                                        </template>
                                                                                    </drop-list>
                                                                                </v-list>
                                                                            </v-card>
                                                                        </v-col>
                                                                        <v-col cols="6"  class="py-0">
                                                                            <v-card color="third" class="pa-3 no_border" elevation="0" style="min-height: 100%">
                                                                                <h2 class="text-white font_20">{{$t('to')}}</h2>
                                                                                <drop-list class="list2 py-2" :items="merge2" @reorder="$event.apply(merge2)" @insert="insert4"
                                                                                            mode="cut" style="min-height: 300px;">
                                                                                    <template v-slot:item="{item,reorder}">
                                                                                        <drag :key="item.title" class="chip my-2" :data="item" @cut="remove(merge2, item)">
                                                                                            <!-- <v-chip class="py-2" :color="reorder ? 'primary' : null" style="border-radius: 0!important;width:100%;">{{item.title}}</v-chip> -->
                                                                                            <v-list-item class="my-2" style="background-color: #e0e0e0!important; min-height: 0"
                                                                                                            :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                                                                                <v-list-item-content>
                                                                                                    <v-list-item-title v-html="item.title"/>
                                                                                                </v-list-item-content>
                                                                                            </v-list-item>
                                                                                            
                                                                                        </drag>
                                                                                    </template>
                                                                                    <template v-slot:feedback="{data}">
                                                                                        <div class="chip" :key="data.title">
                                                                                            <v-chip color="primary" style="border-radius: 0!important;width:100%;">{{data.title}}</v-chip>
                                                                                        </div>
                                                                                    </template>
                                                                                    <template v-slot:inserting-drag-image="{data}">
                                                                                        <v-chip :key="data.title" style="transform: translate(-50%, -50%)">{{data.title}}
                                                                                        </v-chip>
                                                                                    </template>
                                                                                </drop-list>
                                                                            </v-card>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-card-actions>
                                                                    <div class="function_footer">
                                                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                            @click="dialogMerge = false">
                                                                            {{ $t('merge') }}
                                                                        </v-btn>
                                                                    </div>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </template> 
                                                </v-col>
                                                <!-- order list-->
                                                <v-col md="3" v-show="func.orderList" sm="3" col="3" class="pa-1">
                                                    <v-btn color=third class="white--text rounded-0 btn-funtion" style=""> 
                                                        <v-icon left class="mr-0">mdi-ballot-outline</v-icon>
                                                         <span class="text-bold letter_spacing">{{$t('order_list')}}</span>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col sm="12" cols="12" class="py-0"> 
                                            <v-row>
                                                <!-- payments -->
                                                <v-col md="4" sm="3" cols="12" class="pa-1 pl-0">
                                                    <v-row class="mx-0" style="height: 100%;">
                                                        <!-- cash -->
                                                        <v-col sm="6" cols="6" class="pa-1" >
                                                            <template>
                                                                <div justify="center" style="height: 100%;">
                                                                    <v-dialog
                                                                        v-model="dialogCash"
                                                                        fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-bottom-transition"
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
                                                                                <div style="display: inline-grid;">
                                                                                    <v-icon
                                                                                        style="font-size: 35px;"
                                                                                        color="primary"
                                                                                        class="b-cash">
                                                                                    </v-icon>
                                                                                    <span class="font_12 text-bold">{{ $t("cash") }}</span>  
                                                                                </div>
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card style="background-color: #f8f8f9;">
                                                                            <v-container>
                                                                                <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                                    <div class="modal_header">
                                                                                        <v-card-title>{{ $t("cash_receipt") }}</v-card-title>
                                                                                        <v-icon
                                                                                            @click="cancel()"
                                                                                            style="cursor: pointer; font-size: 40px;"
                                                                                            color="grey"
                                                                                            class="float-right mt-n1">close
                                                                                        </v-icon>
                                                                                    </div>
                                                                                    <v-card-text class="modal_text_content">
                                                                                        <v-row>
                                                                                            
                                                                                            <v-col sm="7" cols="7" class="pr-0 py-0 border_right_lightgrey">
                                                                                                <v-row>
                                                                                                    <v-col sm="6" cols="6" class=" function_content pa-3 pb-0">
                                                                                                      
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody>
                                                                                                                    <tr style="background-color: red;color: #fff;">
                                                                                                                        <td class="text-left pr-0 text-bold ">
                                                                                                                            {{ $t('amount_to_pay')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center">:</td>
                                                                                                                        <td class="text-right text-bold">
                                                                                                                            0000000 រៀល
                                                                                                                        </td>
                                                                                                                    </tr>
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
                                                                                                    <v-col sm="6" cols="6" class="pb-0">
                                                                                                        <div class="text-center">
                                                                                                            <v-row>
                                                                                                                <v-col sm="12" cols="12" class="py-0">
                                                                                                                    <v-text-field
                                                                                                                        class="mt-1 "
                                                                                                                        outlined
                                                                                                                        placeholder=""
                                                                                                                        style="width: 72%;margin: auto;"
                                                                                                                    />
                                                                                                                </v-col>
                                                                                                                <v-col sm="12" cols="12" class="pt-0">
                                                                                                                    <v-btn color="secondary" class="text-bold rounded-0 receipt-btn ml-0">
                                                                                                                        1
                                                                                                                    </v-btn>
                                                                                                                        
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn">
                                                                                                                        2
                                                                                                                    </v-btn>

                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn mr-0">
                                                                                                                        3
                                                                                                                    </v-btn>
                                                                                                                    <br>
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn ml-0">
                                                                                                                        4
                                                                                                                    </v-btn>
                                                                                                                        
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn">
                                                                                                                        5
                                                                                                                    </v-btn>

                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn mr-0">
                                                                                                                        6
                                                                                                                    </v-btn>
                                                                                                                    <br>
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn ml-0">
                                                                                                                        7
                                                                                                                    </v-btn>
                                                                                                                        
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn">
                                                                                                                        8
                                                                                                                    </v-btn>

                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn mr-0">
                                                                                                                        9
                                                                                                                    </v-btn>
                                                                                                                    <br>
                                                                                                                        
                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn ml-0">
                                                                                                                        0
                                                                                                                    </v-btn>

                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn">
                                                                                                                        .
                                                                                                                    </v-btn>

                                                                                                                    <v-btn  color="secondary" class="text-bold rounded-0 receipt-btn mr-0">
                                                                                                                        <v-icon>fas fa-backspace</v-icon>
                                                                                                                        c
                                                                                                                    </v-btn>
                                                                                                                </v-col>
                                                                                                            </v-row>
                                                                                                        </div>
                                                                                                        
                                                                                                    </v-col>
                                                                                                    <v-col sm="12" cols="4" class="pl-0 pb-0">
                                                                                                        <v-tabs>
                                                                                                            <v-tab>
                                                                                                                <span  class="text-capitalize text-left">
                                                                                                                {{ $t("kHR") }}
                                                                                                                </span>
                                                                                                            </v-tab>
                                                                                                            <v-tab>
                                                                                                                <span class="text-capitalize text-left">
                                                                                                                {{ $t("usd") }}
                                                                                                                </span>
                                                                                                            </v-tab>
                                                                                                            <v-tab-item>
                                                                                                                <v-col sm="12" cols="12" class="grayBg">
                                                                                                                    <v-card color="white" class="pa-3 no_border text-center" elevation="0">
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                5000 
                                                                                                                            </v-btn>
                                                                                                                                
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                10000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                15000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                20000
                                                                                                                            </v-btn>
                                                                                                                                
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                25000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                30000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                40000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                45000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                50000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                55000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                60000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                65000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                70000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                80000
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                90000
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="primary" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                100000
                                                                                                                            </v-btn>
                                                                                                                    </v-card>
                                                                                                                </v-col>
                                                                                                            </v-tab-item>
                                                                                                            <v-tab-item>
                                                                                                                <v-col sm="12" cols="12" class="grayBg">
                                                                                                                    <v-card color="white" class="pa-3 no_border text-center" elevation="0">
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                5$
                                                                                                                            </v-btn>
                                                                                                                                
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                10$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                15$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                20$
                                                                                                                            </v-btn>
                                                                                                                                
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                25$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                30$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                35$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                40$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                45$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                50$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                55$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                60$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                70$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                80$
                                                                                                                            </v-btn>

                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                90$
                                                                                                                            </v-btn>
                                                                                                                            <v-btn color="third" class="text-white text-bold rounded-0 receipt-btn">
                                                                                                                                100$
                                                                                                                            </v-btn>
                                                                                                                    </v-card>
                                                                                                                </v-col>
                                                                                                            </v-tab-item>
                                                                                                        </v-tabs>
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-col>
                                                                                            <v-col sm="5" cols="5" class="py-0">
                                                                                                <v-row>
                                                                                                    <v-col cols="12" class="text-center pb-0">
                                                                                                        <h2 class="">{{$t('receipt')}}</h2>
                                                                                                    </v-col>
                                                                                                    
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('cashier')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        lin
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('general_customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        6.40$
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('rate')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        4150
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('table')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        T20
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('order_num')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                            0001
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('date')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        wed 10 2022
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <div class="d-flex flex-column" style="height: 100%;">
                                                                                                            <v-simple-table fixed-header height="350px"  class="flex-1" >
                                                                                                                <template v-slot:default>
                                                                                                                    <thead class="th-invoice">
                                                                                                                        <tr>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('items')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('qty')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('price')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('amount')}}
                                                                                                                            </th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody class="">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>

                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                            <v-simple-table>
                                                                                                                <template v-slot:default>
                                                                                                                    <tbody class="tb-pong">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0 pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                                {{$t('sub_total')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">:</td>
                                                                                                                            <td class="text-right pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                            7.90$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            1.50$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total usd whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            6.40$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('paid_by')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            Cash
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total KHR whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            26,560៛
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                        </div>
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-card-text>
                                                                                    <v-divider/>
                                                                                    <v-card-actions class="py-0">
                                                                                        <div class="function_footer pt-0">
                                                                                            <v-row>
                                                                                                <v-col cols="7" class="border_right_lightgrey">
                                                                                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                                                    @click="dialogCash = false">{{ $t('cancel') }}
                                                                                                    </v-btn>

                                                                                                    <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogCash = false">
                                                                                                        {{ $t('pay') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                                <v-col cols="5">
                                                                                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogCash = false">
                                                                                                        {{ $t('print') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </div>
                                                                                        <v-spacer></v-spacer>
                                                                                    </v-card-actions>
                                                                                </v-card>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </div>
                                                            </template>
                                                        </v-col>
                                                        <!-- card -->
                                                        <v-col sm="6" cols="6" class="pa-1" >
                                                            <template>
                                                                <div justify="center" style="height: 100%;">
                                                                    <v-dialog
                                                                        v-model="dialogCard"
                                                                        fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-bottom-transition"
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
                                                                                <div style="display: inline-grid;">
                                                                                    <v-icon
                                                                                        style="font-size: 35px;"
                                                                                        color="primary"
                                                                                        class="b-loyalty">
                                                                                    </v-icon>
                                                                                    <span class="font_12 text-bold">{{ $t("card") }}</span>  
                                                                                </div>
                                                                                
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card style="background-color: #f8f8f9;">
                                                                            <v-container>
                                                                                <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                                    <div class="modal_header">
                                                                                        <v-card-title>{{ $t("card") }}</v-card-title>
                                                                                        <v-icon
                                                                                            @click="cancel()"
                                                                                            style="cursor: pointer; font-size: 40px;"
                                                                                            color="grey"
                                                                                            class="float-right mt-n1">close
                                                                                        </v-icon>
                                                                                    </div>
                                                                                    <v-card-text class="modal_text_content">
                                                                                        <v-row>    
                                                                                            <v-col sm="7" cols="7" class="pl-0 py-0 border_right_lightgrey">
                                                                                                <v-col sm="12" cols="12" class=" function_content pa-3 pb-0">
                                                                                                    <v-row>
                                                                                                        <v-col sm="4" cols="4" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="cardPayment()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/mastercard.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="4" cols="4" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="cardPayment()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/visa.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="4" cols="4" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="cardPayment()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/union-pay.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="4" cols="4" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="cardPayment()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/diners-club.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        
                                                                                                      
                                                                                                    </v-row>
                                                                                                </v-col>
                                                                                            </v-col>
                                                                                            <v-col sm="5" cols="5" class="py-0">
                                                                                                <v-row>
                                                                                                    <v-col cols="12" class="text-center pb-0">
                                                                                                        <h2 class="">{{$t('receipt')}}</h2>
                                                                                                    </v-col>
                                                                                                    
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('cashier')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        lin
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('general_customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        6.40$
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('rate')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        4150
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('table')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        T20
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('order_num')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                            0001
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('date')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        wed 10 2022
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <div class="d-flex flex-column" style="height: 100%;">
                                                                                                            <v-simple-table fixed-header height="350px"  class="flex-1" >
                                                                                                                <template v-slot:default>
                                                                                                                    <thead class="th-invoice">
                                                                                                                        <tr>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('items')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('qty')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('price')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('amount')}}
                                                                                                                            </th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody class="">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>

                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                            <v-simple-table>
                                                                                                                <template v-slot:default>
                                                                                                                    <tbody class="tb-pong">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0 pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                                {{$t('sub_total')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">:</td>
                                                                                                                            <td class="text-right pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                            7.90$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            1.50$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total usd whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            6.40$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('paid_by')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            Cash
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total KHR whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            26,560៛
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                        </div>
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-card-text>
                                                                                    <v-divider/>
                                                                                    <v-card-actions class="py-0">
                                                                                        <div class="function_footer pt-0">
                                                                                            <v-row>
                                                                                                <v-col cols="7" class="border_right_lightgrey">
                                                                                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                                                    @click="dialogCard = false">{{ $t('cancel') }}
                                                                                                    </v-btn>

                                                                                                    <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogCard = false">
                                                                                                        {{ $t('pay') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                                <v-col cols="5">
                                                                                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogCard = false">
                                                                                                        {{ $t('print') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </div>
                                                                                        <v-spacer></v-spacer>
                                                                                    </v-card-actions>
                                                                                </v-card>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </div>
                                                            </template>
                                                            
                                                        </v-col>
                                                         <!-- cardPayment -->
                                                        <template>
                                                            <v-row>
                                                                <v-dialog
                                                                    v-model="dialogCardPayment"
                                                                    persistent
                                                                    max-width="350px"
                                                                    >
                                                                    <v-card>
                                                                        <div class="modal_header">
                                                                            <v-card-title>{{ $t("card_payment") }}</v-card-title>
                                                                            <v-icon
                                                                                @click="dialogCardPayment = false"
                                                                                style="cursor: pointer; font-size: 30px;"
                                                                                color="grey"
                                                                                class="float-right mt-n1">close
                                                                            </v-icon>
                                                                        </div>
                                                                        <v-col md="12" col="12" class="function_content pa-3">
                                                                            <v-row>
                                                                                <v-col  sm="12" cols="12" class="pb-0">
                                                                                    <v-select
                                                                                    :items="['ABA', 'Acleda', 'PPCB', 'AMK']"
                                                                                    :label="$t('select_banks')"
                                                                                    outlined
                                                                                    append-icon="mdi-account"
                                                                                    required
                                                                                    ></v-select>
                                                                                </v-col>
                                                                                <v-col  sm="6" cols="6" class="pt-1 pr-0">
                                                                                    <v-text-field
                                                                                    :label="$t('expiry_date')"
                                                                                    required
                                                                                    outlined
                                                                                    type="number"
                                                                                    ></v-text-field>
                                                                                </v-col>
                                                                                <v-col  sm="6" cols="6" class="pt-1">
                                                                                    <v-text-field
                                                                                    :label="$t('last_4_digit')"
                                                                                    required
                                                                                    outlined
                                                                                    type="number"
                                                                                    ></v-text-field>
                                                                                </v-col>
                                                                                
                                                                            </v-row>
                                                                                
                                                                        </v-col>
                                                                        <v-card-actions>
                                                                            <div class="function_footer">
                                                                                <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                    @click="dialogCardPayment = false">
                                                                                    {{ $t('enter') }}
                                                                                </v-btn>
                                                                            </div>
                                                                            <v-spacer></v-spacer>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </v-row>
                                                        </template>

                                                        <!-- bank -->
                                                        <v-col sm="6" cols="6" class="pa-1" >
                                                            <template>
                                                                <div justify="center" style="height: 100%;">
                                                                    <v-dialog
                                                                        v-model="dialogBank"
                                                                        fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-bottom-transition"
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

                                                                                <div style="display: inline-grid;">
                                                                                    <v-icon
                                                                                        style="font-size: 35px;"
                                                                                        color="primary"
                                                                                        class="b-banking">
                                                                                    </v-icon>
                                                                                    <span class="font_12 text-bold">{{ $t("bank") }}</span>  
                                                                                </div>
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card style="background-color: #f8f8f9;">
                                                                            <v-container>
                                                                                <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                                    <div class="modal_header">
                                                                                        <v-card-title>{{ $t("bank") }}</v-card-title>
                                                                                        <v-icon
                                                                                            @click="cancel()"
                                                                                            style="cursor: pointer; font-size: 40px;"
                                                                                            color="grey"
                                                                                            class="float-right mt-n1">close
                                                                                        </v-icon>
                                                                                    </div>
                                                                                    <v-card-text class="modal_text_content">
                                                                                        <v-row>    
                                                                                            <v-col sm="7" cols="7" class="px-0 py-0 border_right_lightgrey">
                                                                                                <v-col sm="12" cols="12" class=" function_content pa-3 pb-0">
                                                                                                    <v-row>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/bakong.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/aba.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/aclada.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/amret.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/bred.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/phillip.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/ppcb.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col> 
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/sathapana.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>   
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/wing.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/jtrust.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/Kookmin.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/maybank.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/prince.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/sbi.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/shinhan.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>
                                                                                                        <v-col sm="3" cols="3" class="pt-0">
                                                                                                            <v-card
                                                                                                                class="mx-auto"
                                                                                                                max-width="465"
                                                                                                                outlined
                                                                                                                @click="InfoBank()"
                                                                                                            >
                                                                                                                <v-list-item three-line>
                                                                                                                    <v-list-item-content class="pk-3">
                                                                                                                        <v-row>
                                                                                                                            <v-col sm="12" cols="12" class="">
                                                                                                                                <img
                                                                                                                                    class="img-1"
                                                                                                                                    src="@/assets/images/bank/amk.png"
                                                                                                                                    width="100%"
                                                                                                                                />
                                                                                                                            </v-col>
                                                                                                                        </v-row>
                                                                                                                    </v-list-item-content>
                                                                                                                </v-list-item>
                                                                                                            </v-card>
                                                                                                        </v-col>             
                                                                                                    </v-row>
                                                                                                </v-col>
                                                                                            </v-col>
                                                                                            <v-col sm="5" cols="5" class="py-0">
                                                                                                <v-row>
                                                                                                    <v-col cols="12" class="text-center pb-0">
                                                                                                        <h2 class="">{{$t('receipt')}}</h2>
                                                                                                    </v-col>
                                                                                                    
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('cashier')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        lin
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('general_customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        6.40$
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('rate')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        4150
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('table')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        T20
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('order_num')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                            0001
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('date')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        wed 10 2022
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <div class="d-flex flex-column" style="height: 100%;">
                                                                                                            <v-simple-table fixed-header height="350px"  class="flex-1" >
                                                                                                                <template v-slot:default>
                                                                                                                    <thead class="th-invoice">
                                                                                                                        <tr>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('items')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('qty')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('price')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('amount')}}
                                                                                                                            </th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody class="td-invioce">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>

                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                            <v-simple-table>
                                                                                                                <template v-slot:default>
                                                                                                                    <tbody class="tb-pong">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0 pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                                {{$t('sub_total')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">:</td>
                                                                                                                            <td class="text-right pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                            7.90$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            1.50$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total usd whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            6.40$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('paid_by')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            Cash
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total KHR whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            26,560៛
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                        </div>
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-card-text>
                                                                                    <v-divider/>
                                                                                    <v-card-actions class="py-0">
                                                                                        <div class="function_footer pt-0">
                                                                                            <v-row>
                                                                                                <v-col cols="7" class="border_right_lightgrey">
                                                                                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                                                    @click="dialogBank = false">{{ $t('cancel') }}
                                                                                                    </v-btn>

                                                                                                    <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogBank = false">
                                                                                                        {{ $t('pay') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                                <v-col cols="5">
                                                                                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogBank = false">
                                                                                                        {{ $t('print') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </div>
                                                                                        <v-spacer></v-spacer>
                                                                                    </v-card-actions>
                                                                                </v-card>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </div>
                                                            </template>
                                                            
                                                        </v-col>
                                                        <!-- bank-info -->
                                                        <template>
                                                            <v-row>
                                                                <v-dialog
                                                                    v-model="infoBank"
                                                                    persistent
                                                                    max-width="400px"
                                                                    >
                                                                    <v-card>
                                                                        <div class="modal_header">
                                                                            <v-card-title>{{ $t("bank_info") }}</v-card-title>
                                                                            <v-icon
                                                                                @click="infoBank = false"
                                                                                style="cursor: pointer; font-size: 30px;"
                                                                                color="grey"
                                                                                class="float-right mt-n1">close
                                                                            </v-icon>
                                                                        </div>
                                                                        <v-col md="12" col="12" class="function_content pa-3">
                                                                            <v-row>
                                                                                <v-col sm="6" cols="6" class="pt-0">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="InfoBank()"
                                                                                    >
                                                                                        <v-list-item three-line>
                                                                                            <v-list-item-content class="pk-3">
                                                                                                <v-row>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <img
                                                                                                            class="img-1"
                                                                                                            src="@/assets/images/bank/bakong.png"
                                                                                                            width="100%"
                                                                                                        />
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-list-item-content>
                                                                                        </v-list-item>
                                                                                    </v-card>
                                                                                </v-col>
                                                                                <v-col sm="6" cols="6" class="pt-0">
                                                                                    <v-card
                                                                                        class="mx-auto"
                                                                                        max-width="465"
                                                                                        outlined
                                                                                        @click="InfoBank()"
                                                                                    >
                                                                                        <v-list-item three-line>
                                                                                            <v-list-item-content class="pk-3">
                                                                                                <v-row>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <img
                                                                                                            class="img-1"
                                                                                                            src="@/assets/images/bank/qr-code.png"
                                                                                                            width="100%"
                                                                                                        />
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-list-item-content>
                                                                                        </v-list-item>
                                                                                    </v-card>
                                                                                </v-col>
                                                                                <v-col cols="12"  md="12" class="pt-0">
                                                                                    <v-row>
                                                                                        <v-col md="12" col="12" class="function_content pa-3">
                                                                                            <template>
                                                                                                <v-simple-table>
                                                                                                    <template>
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td class="text-left tdbig">
                                                                                                                    <span class="niradei_medium font_14 grey--text">
                                                                                                                        {{ $t("account_name") }}
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                                <td class="text-left tdbig">:</td>
                                                                                                                <td class="text-right">
                                                                                                                    <span class="niradei_heavy font_18 dark_grey">
                                                                                                                pheakdey
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td class="text-left tdbig">
                                                                                                                    <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("account_num") }}
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                                <td class="text-left tdbig">:</td>
                                                                                                                <td class="text-right">
                                                                                                                    <span class="niradei_heavy font_18 dark_grey">
                                                                                                                0000000001234
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td class="text-left tdbig">
                                                                                                                    <span class="niradei_medium font_14 grey--text">
                                                                                                                    {{ $t("reference_num") }}
                                                                                                                    </span>
                                                                                                                </td>
                                                                                                                <td class="text-left tdbig">:</td>
                                                                                                                <td class="text-right px-0 pt-2">
                                                                                                                    <v-text-field
                                                                                                                        required
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
                                                                                        
                                                                                    </v-row>
                                                                                </v-col>
                                                                            </v-row>
                                                                        </v-col>
                                                                        <v-card-actions>
                                                                            <div class="function_footer text-right">
                                                                                <v-btn color="secondary" class="mr-2 white--text text-capitalize"
                                                                                    @click="infoBank = false">
                                                                                    {{ $t('skip') }}
                                                                                </v-btn>

                                                                                <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                                    @click="infoBank = false">
                                                                                    {{ $t('enter') }}
                                                                                </v-btn>
                                                                            </div>
                                                                            <v-spacer></v-spacer>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </v-row>
                                                        </template>

                                                        <!-- qrcode -->
                                                        <v-col sm="6" cols="6" class="pa-1" >
                                                            <template>
                                                                <div justify="center" style="height: 100%;">
                                                                    <v-dialog
                                                                        v-model="dialogQrcode"
                                                                        fullscreen
                                                                        hide-overlay
                                                                        transition="dialog-bottom-transition"
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
                                                                                
                                                                                <div style="display: inline-grid;">
                                                                                    <v-icon
                                                                                        style="font-size: 35px;"
                                                                                        color="primary"
                                                                                        class="b-payment">
                                                                                    </v-icon>
                                                                                    <span class="font_12 text-bold">{{ $t("KHQR") }}</span>  
                                                                                </div>
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-card style="background-color: #f8f8f9;">
                                                                            <v-container>
                                                                                <v-card outlined dense class="px-3 no_border mt-4" color="white">
                                                                                    <div class="modal_header">
                                                                                        <v-card-title>{{ $t("KHQR") }}</v-card-title>
                                                                                        <v-icon
                                                                                            @click="cancel()"
                                                                                            style="cursor: pointer; font-size: 40px;"
                                                                                            color="grey"
                                                                                            class="float-right mt-n1">close
                                                                                        </v-icon>
                                                                                    </div>
                                                                                    <v-card-text class="modal_text_content">
                                                                                        <v-row>    
                                                                                            <v-col sm="7" cols="7" class="px-0 py-0 border_right_lightgrey d-flex">
                                                                                                <v-row>
                                                                                                    
                                                                                                    <v-col sm="12" cols="12" class="pt-0 d-flex">
                                                                                                        
                                                                                                        <v-card
                                                                                                            class="ma-auto text-center"
                                                                                                            max-width="400"
                                                                                                            outlined
                                                                                                        >
                                                                                                            <v-list-item three-line>
                                                                                                                <v-list-item-content class="pk-3">
                                                                                                                    <v-row>
                                                                                                                        <h2 class="mt-4" style="width: 100%;">scan QR code to pay</h2>
                                                                                                                        <v-col sm="12" cols="12" class="">
                                                                                                                            <img
                                                                                                                                class="img-1"
                                                                                                                                src="@/assets/images/bank/qr-code.png"
                                                                                                                                width="100%"
                                                                                                                            />
                                                                                                                        </v-col>
                                                                                                                    </v-row>
                                                                                                                </v-list-item-content>
                                                                                                            </v-list-item>
                                                                                                        </v-card>
                                                                                                    </v-col>
                                                                                                </v-row>  
                                                                                            </v-col>
                                                                                            <v-col sm="5" cols="5" class="py-0">
                                                                                                <v-row>
                                                                                                    <v-col cols="12" class="text-center pb-0">
                                                                                                        <h2 class="">{{$t('receipt')}}</h2>
                                                                                                    </v-col>
                                                                                                    
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('cashier')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        lin
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('general_customer')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        6.40$
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('rate')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        4150
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="6" cols="6" class="px-0">
                                                                                                        <v-simple-table>
                                                                                                            <template v-slot:default>
                                                                                                                <tbody class="tb-pong">
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('table')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        T20
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('order_num')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                            0001
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td class="text-left pr-0">
                                                                                                                            {{$t('date')}}
                                                                                                                        </td>
                                                                                                                        <td class="text-center pl-0">:</td>
                                                                                                                        <td class="text-right">
                                                                                                                        wed 10 2022
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    
                                                                                                                </tbody>
                                                                                                            </template>
                                                                                                        </v-simple-table>
                                                                                                    </v-col>
                                                                                                    <v-col sm="12" cols="12" class="">
                                                                                                        <div class="d-flex flex-column" style="height: 100%;">
                                                                                                            <v-simple-table fixed-header height="350px"  class="flex-1" >
                                                                                                                <template v-slot:default>
                                                                                                                    <thead class="th-invoice">
                                                                                                                        <tr>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('items')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('qty')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('price')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </th>
                                                                                                                            <th class="text-left">
                                                                                                                                {{$t('amount')}}
                                                                                                                            </th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody class="">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                បាយផាក់ឡូវ
                                                                                                                            </td>
                                                                                                                            <td class="text-center">1</td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            0.75$
                                                                                                                            </td>
                                                                                                                            <td class="text-right">
                                                                                                                            3.00$
                                                                                                                            </td>
                                                                                                                        </tr>

                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                            <v-simple-table>
                                                                                                                <template v-slot:default>
                                                                                                                    <tbody class="tb-pong">
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0 pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                                {{$t('sub_total')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">:</td>
                                                                                                                            <td class="text-right pt-2" style="border-top: thin solid rgba(0, 0, 0, 0.12)">
                                                                                                                            7.90$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('discount')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            1.50$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total usd whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            6.40$
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('paid_by')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right">
                                                                                                                            Cash
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td class="text-left pr-0">
                                                                                                                                {{$t('total KHR whit tax 10%')}}
                                                                                                                            </td>
                                                                                                                            <td class="text-center">:</td>
                                                                                                                            <td class="text-right font_18 text-bold">
                                                                                                                            26,560៛
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        
                                                                                                                    </tbody>
                                                                                                                </template>
                                                                                                            </v-simple-table>
                                                                                                        </div>
                                                                                                    </v-col>
                                                                                                </v-row>
                                                                                            </v-col>
                                                                                        </v-row>
                                                                                    </v-card-text>
                                                                                    <v-divider/>
                                                                                    <v-card-actions class="py-0">
                                                                                        <div class="function_footer pt-0">
                                                                                            <v-row>
                                                                                                <v-col cols="7" class="border_right_lightgrey">
                                                                                                    <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                                                    @click="dialogQrcode = false">{{ $t('cancel') }}
                                                                                                    </v-btn>

                                                                                                    <v-btn color="primary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogQrcode = false">
                                                                                                        {{ $t('pay') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                                <v-col cols="5">
                                                                                                    <v-btn color="secondary" class="float-right white--text text-capitalize"
                                                                                                        @click="dialogQrcode = false">
                                                                                                        {{ $t('print') }}
                                                                                                    </v-btn>

                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </div>
                                                                                        <v-spacer></v-spacer>
                                                                                    </v-card-actions>
                                                                                </v-card>
                                                                            </v-container>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </div>
                                                            </template>
                                                            
                                                        </v-col>
                                                        
                                                    </v-row>
                                                </v-col>
                                                <v-col md="5" sm="5" cols="12" class="pa-1 pl-0 float-right text-right">
                                                        <v-btn class="rounded-0 calculator-btn-1 ml-0">
                                                            1
                                                        </v-btn>
                                                            
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            2
                                                        </v-btn>

                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            3
                                                        </v-btn>

                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            4
                                                        </v-btn>
                                                        <br>
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            5
                                                        </v-btn>

                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            6
                                                        </v-btn>
                                                       
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            7
                                                        </v-btn>
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            8
                                                        </v-btn>
                                                        <br>
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            9
                                                        </v-btn>
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            0
                                                        </v-btn>
                                                            
                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            .
                                                        </v-btn>

                                                        <v-btn class="rounded-0 calculator-btn-1">
                                                            c
                                                        </v-btn>
                                                    
                                                </v-col>
                                                <v-col md="3" sm="3" cols="12" class="pa-1 pr-0 text-right">
                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        qty
                                                    </v-btn>
                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        modi.
                                                    </v-btn>

                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        dis.
                                                    </v-btn>
                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        emp.
                                                    </v-btn>

                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        price
                                                    </v-btn>
                                                    
                                                    <v-btn class="rounded-0 calculator-btn-1" style="width: 43%;">
                                                        uom
                                                    </v-btn>
                                                </v-col>
                                            </v-row> 
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>         
                        </v-col>
                        <!-- items list -->
                        <v-col md="5" sm="12" cols="12" class=" sidebar-left2 pt-0" style="overflow-y: auto;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pa-0">
                                    <v-card flat height="98vh" class="card-item px-0" style=""> 
                                        <v-card-text class="pa-0">
                                             <v-row class="" style=" margin: auto;">
                                                <v-col sm="4" cols="4" class="py-0 px-1">
                                                    <v-select class="mt-1 rounded-0 "
                                                            clearable
                                                            outlined
                                                            :label="$t('code')"
                                                    />
                                                </v-col>
                                                <v-col sm="8" cols="8"  class="py-0 px-1">
                                                    <v-text-field
                                                        class="mt-1 rounded-0 "
                                                        outlined
                                                        :label="$t('scan_code')"
                                                        append-icon="mdi-barcode-scan"
                                                    ></v-text-field>
                                                </v-col>
                                                <LoadingMe
                                                    :isLoading="loadingItmBlock"
                                                    :fullPage="false"
                                                    :myLoading="true" />
                                                <!-- item -->
                                                <div v-show="showItem" style="width: 100%;display: contents; text-align: center;">
                                                    <v-col md="4" sm="4" xs="6" cols="12" class="pt-0 px-1" v-for="item in items" :key="item.id">
                                                        <v-card
                                                            class="pb-0"
                                                            elevation="0"
                                                            max-width="200"
                                                            :style="item.borderColor"
                                                            @click="addItem(item)"
                                                        >
                                                            <template slot="progress">
                                                                <v-progress-linear
                                                                    color="deep-purple"
                                                                    height="10"
                                                                    indeterminate
                                                                ></v-progress-linear>
                                                            </template>
                                                            <v-img
                                                                class="mt-2"
                                                                height="140"
                                                                aspect-ratio="1.7"
                                                                contain
                                                                :src="item.img"
                                                            ></v-img>
                                                            <p class="pa-2 px-1 name-items mb-0" style="height: 50px;line-height: 1.15;">{{ item.name }}</p>
                                                            <v-divider class="mx-4"></v-divider>
                                                            <v-card-text class="py-0 text-white" :style="'background-color: #898c8f;text-align: center;border-radius: 0;' + item.titleColor">
                                                                <h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} {{ item.uom[0].priceLevel.currency.symbol}}</h2>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-col>
                                                </div>
                                                <!-- category -->
                                                <v-row v-show="showCatePage" style="width: 100%;display: contents; text-align: center;">
                                                    <v-col md="4" sm="4" xs="6" cols="12" class="pa-1" v-for="item in categories" :key="item.id">
                                                        <v-card
                                                            class="pb-0"
                                                            elevation="0"
                                                            max-width="200"
                                                            :style="item.borderColor"
                                                            @click="searchItemByCate(item.id)"
                                                        >
                                                            <template slot="progress">
                                                                <v-progress-linear
                                                                    color="deep-purple"
                                                                    height="10"
                                                                    indeterminate
                                                                ></v-progress-linear>
                                                            </template>
                                                            <v-img
                                                                class="mt-2"
                                                                height="140"
                                                                aspect-ratio="1.7"
                                                                contain
                                                                :src="item.img"
                                                            ></v-img>
                                                            <p class="pa-2 name-items mb-0" style="height: 50px;">{{ item.name }}</p>
                                                            <v-divider class="mx-4"></v-divider>
                                                            <v-card-text class="py-0 text-white" style="background-color: #898c8f;text-align: center;">
                                                                <!--h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} {{ item.uom[0].priceLevel.currency.symbol}}</h2-->
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                                <!-- group -->
                                                <v-row v-show="showGroupPage" style="width: 100%;display: contents; text-align: center;">
                                                    <v-col md="4" sm="4" xs="6" cols="12" class="pa-1" v-for="item in cateGroup" :key="item.id">
                                                        <v-card
                                                            class="pb-0"
                                                            elevation="0"
                                                            max-width="200"
                                                            :style="item.borderColor"
                                                            @click="searchItemByGroup(item.id)"
                                                        >
                                                            <template slot="progress">
                                                                <v-progress-linear
                                                                    color="deep-purple"
                                                                    height="10"
                                                                    indeterminate
                                                                ></v-progress-linear>
                                                            </template>
                                                            <v-img
                                                                class="mt-2"
                                                                height="140"
                                                                aspect-ratio="1.7"
                                                                contain
                                                                :src="item.img"
                                                            ></v-img>
                                                            <p class="pa-2 name-items mb-0" style="height: 50px;">{{ item.name }}</p>
                                                            <v-divider class="mx-4"></v-divider>
                                                            <v-card-text class="py-0 text-white" style="background-color: #898c8f;text-align: center;">
                                                                <!--h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} {{ item.uom[0].priceLevel.currency.symbol}}</h2-->
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                                <!-- sub group -->
                                                <v-row v-show="showSupGroupPage" style="width: 100%;display: contents; text-align: center;">
                                                    <v-col md="4" sm="4" xs="6" cols="12" class="pa-1" v-for="item in subGroup" :key="item.id">
                                                        <v-card
                                                            class="pb-0"
                                                            elevation="0"
                                                            max-width="200"
                                                            :style="item.borderColor"
                                                            @click="searchItemBySubGroup(item.id)"
                                                        >
                                                            <template slot="progress">
                                                                <v-progress-linear
                                                                    color="deep-purple"
                                                                    height="10"
                                                                    indeterminate
                                                                ></v-progress-linear>
                                                            </template>
                                                            <v-img
                                                                class="mt-2"
                                                                height="140"
                                                                aspect-ratio="1.7"
                                                                contain
                                                                :src="item.img"
                                                            ></v-img>
                                                            <p class="pa-2 name-items mb-0" style="height: 50px;">{{ item.name }}</p>
                                                            <v-divider class="mx-4"></v-divider>
                                                            <v-card-text class="py-0 text-white" style="background-color: #898c8f;text-align: center;">
                                                                <!--h2 class="text-white mb-0" style="font-size:18px;"> {{ item.price }} {{ item.uom[0].priceLevel.currency.symbol}}</h2-->
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <!-- right sidebar -->
                        <v-col sm="1" cols="1" class=" sidebar-left3 pa-0">
                            <v-card flat  height="98vh" color="">
                                <v-btn class=" rounded-0  btn-right" icon @click="toggle">
                                    <i   
                                        :class="[fullscreen ? 'b-mini' : 'b-full']"
                                    />
                                </v-btn>
                                <v-btn @click="bindItems" class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-product" />
                                        <h6 class="letter_spacing">{{$t('items')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn @click="itemFavorite" class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-favorite" />
                                        <h6 class="letter_spacing">{{$t('favorite')}}</h6>
                                    </div>
                                </v-btn>
                                
                                <v-btn @click="goCategory" class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-catagories" />
                                        <h6 class="letter_spacing">{{$t('categories')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn @click="goGroup" class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-dimensions" />
                                        <h6 class="letter_spacing">{{$t('group')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn @click="goSubGroup" class=" rounded-0  btn-right" style="">
                                    <div class="d-block">
                                        <i  class=" b-specific" />
                                        <h6 class="letter_spacing">{{$t('sub_group')}}</h6>
                                    </div>
                                </v-btn>
                                <v-btn @click="pullData()" class=" rounded-0  btn-right" style="padding: 15px 0 !important;height: auto!important;">
                                    <div class="d-block">
                                        <i  class=" b-refresh" />
                                        <h6 class="letter_spacing">{{$t('pull_data')}}</h6>
                                        <p class="font_10 mb-0" style="letter-spacing: initial;">As of:<br> {{pullAsOf}}</p>
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
import {Drag,DropList} from "vue-easy-dnd";
import generalSettingModel from "@/scripts/commerce/model/GeneralSetting"
import { i18n } from "@/i18n";
const commerceHandler = require("@/scripts/commerce/handler/commerceHandler")
const priceLevelHandler = require("@/scripts/priceLevelHandler")
// const categoryHandler = require("@/scripts/categoryHandler")
const groupHandler = require("@/scripts/groupHandler")
const subGroupHandler = require("@/scripts/subGroupHandler")
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie()
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
// item line
const itemLinePrefix = "lin-"
import ItemLineModel from "@/scripts/invoice/model/ItemLine"
import { uuid } from "vue-uuid"
import SaleFormContentModel from "@/scripts/model/SaleFormContent"
const saleFormContentModel = new SaleFormContentModel({})
const saleFormContentHandler = require("@/scripts/saleFormContentHandler")
import InvoiceModel from "@/scripts/invoice/model/Invoice"
const invoiceModel = new InvoiceModel({})
const accountHandler = require("@/scripts/handler/accounting/account")
import CustomerModel from "@/scripts/model/Customer"
export default {
    data: () => ({
        disPriceLevel: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        year: new Date().getFullYear(),
        isAccountLogo: true,
        dialogLoyalty: false,
        dialogPartner: false,
        dialogReward: false,
        rewardForm: false,
        dialogPromotion:false,
        dialogOrder: false,
        dialogCard: false,
        dialogCardPayment: false,
        dialog: false,
        dialogCash: false,
        dialogBank: false,
        dialogQrcode: false,
        dialogNote: false,
        infoBank: false,
        dialogParksale: false,
        dialogInvoice: false,
        dialogOrderReport: false,
        dialogDelivery: false,
        dialogSplit: false,
        dialogMerge: false,
        dialogCountGuest: false,
        localMen: {
            coun: 0
        },
        localWomen: {
            coun: 0
        },
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
        },
        g: new generalSettingModel({}),
        items1: [
            {
                name: "coffee",
                title: "Coffee"
            },
            {
                name: "hotCoffee",
                title: "Hot Coffee"
            },
            {
                name: "iceCream",
                title: "Ice Cream"
            }
        ],
        items2: [
        ],
        merge1: [
            {
                name: "table1",
                title: "Table 01"
            },
            {
                name: "table2",
                title: "Table 02"
            },
            {
                name: "table3",
                title: "Table 03"
            }
        ],
        merge2: [
        ],
        //
        imgUrl: "https://s3-ap-southeast-1.amazonaws.com/images.banhji/",
        priceLevels: [],
        priceLevel: '',
        // price product
        lastPPKey: {},
        priceProducts: [],
        // itme
        lastPKey: {},
        allItems: [],
        loadingSetting: true,
        loadPrice: true,
        loadPullData: false,
        startFlowAt: 0,
        activePin: {
            name: '',
            pinCode: ''
        },
        // other function
        func: {
            reward: false,
            promotion: false,
            parksale: false,
            invoice: false,
            note: false,
            delivery: false,
            resetOrder: false,
            splitInv: false,
            clearOrder: false,
            saleUnit: false,
            countGuest: false,
            mergeInv: false,
            orderList: false,
            orderType: false, 
        },
        // guest
        guestCount: {
            localMen: 0,
            localWomen: 0,
            forMen: 0,
            forWomen: 0
        },
        // order type
        dialogOrderType: false,
        activeOrderType: {},
        isCategoryPage: false,
        // category
        categories: [],
        cateGroup: [],
        subGroup: [],
        showCatePage: false,
        showItem: true,
        showGroupPage: false,
        showSupGroupPage: false,
        // pull data
        pullAsOf: localStorage.getItem(instituteId + 'commRPullDataAt') != null ? kendo.toString(new Date(parseInt(localStorage.getItem(instituteId + 'commRPullDataAt'))), 'yyyy-MM-dd h:m tt') : '',
        // line 
        lineDS: [],
        selectItem: {},
        loadingItmBlock: false,
        // 
        itemLine: new ItemLineModel({}),
        saleFormContent: saleFormContentModel,
        invoice: invoiceModel,
        taxListTotal: [],
        customerOtherChargeItem: [],
        mOtherCharge: [],
        pointAmount: 0,
        jRaw: [],
        coa: [],
        receivableAcc: [],
        //session
        session: {
            name: '',
            startDate: kendo.toString(new Date(), 'yyyy-MM-dd')
        },
        //customer
        customerPoint: 0,
        customer: new CustomerModel({}),
    }),  
    methods: {
        // guest count
        guestIncLocalMen(){
            this.guestCount.localMen += 1
        },
        guestDecLocalMen(){
            if(this.guestCount.localMen > 0){
                this.guestCount.localMen -= 1
            }
        },
        guestIncLocalWomen(){
            this.guestCount.localWomen += 1
        },
        guestDecLocalWomen(){
            if(this.guestCount.localWomen > 0){
                this.guestCount.localWomen -= 1
            }
        },
         guestIncForMen(){
            this.guestCount.forMen += 1
        },
        guestDecForMen(){
            if(this.guestCount.forMen > 0){
                this.guestCount.forMen -= 1
            }
        },
        guestIncForWomen(){
            this.guestCount.forWomen += 1
        },
        guestDecForWomen(){
            if(this.guestCount.forWomen > 0){
                this.guestCount.forWomen -= 1
            }
        },
        skipGuestCount(){
            this.dialogCountGuest = false
            this.guestCount = {
                localMen: 0,
                localWomen: 0,
                forMen: 0,
                forWomen: 0
            }
            this.checkOrderFlow()
        },
        enterGuestCount(){
            this.dialogCountGuest = false
            this.checkOrderFlow()
        },
        //loyalty
        skipLoyalty(){
            this.dialogLoyalty = false
            this.checkOrderFlow()
        },
        // partner
        skipPartner(){
            this.dialogPartner = false
            this.dialogOrder = false
            this.checkOrderFlow()
        },
        enterPartner(){
            this.dialogPartner = false
            this.dialogOrder = false
            this.checkOrderFlow()
        },
        // order type
        skipOrderType(){
            this.dialogOrderType = false
            this.checkOrderFlow()
        },
        enterOrderType(e){
            this.activeOrderType = e
            this.dialogOrderType = false
            this.checkOrderFlow()
        },
        hasHistory () { 
            return window.history.length > 2 
        },
        cancel() {
            this.$swal({
                title: i18n.t("msg_title_warning"),
                text: i18n.t("msg_discard"),
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: i18n.t("cancel"),
                confirmButtonColor: "#4d4848",
                cancelButtonColor: "#ED1A3A",
                confirmButtonText: i18n.t("discard"),
            }).then((result) => {
                if (result.value) {
                    this.clear();
                    this.$router.go(-1);
                }
            });
        },
        close() {
           this.$router.go(-1);
        },
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
        InfoBank(){
            this.infoBank = true;
        },
        PartnerToSale(){
            window.location.reload()
        },
        cardPayment(){
            this.dialogCardPayment = true;
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
            window.console.log(this.pin, 'pin')
            let activePin = this.g.userPinData.filter((o) => {return o.pinCode == this.pin})
            window.console.log(activePin, 'actvie pin')
            if(activePin.length > 0){
                this.activePin = activePin[0]
                this.pin = ''
                this.pinActivate = false
                this.checkOrderFlow()
            }else{
                this.pin = ''
                this.activePin = {
                    name: '',
                    pinCode: ''
                }
            }
        },
        // split
        insert1(event) {
            this.items1.splice(event.index, 0, event.data);
        },
        insert2(event) {
            this.items2.splice(event.index, 0, event.data);
        },
        remove(array, value) {
            let index = array.indexOf(value);
            array.splice(index, 1);
        },
        // marge
        insert3(event) {
            this.merge1.splice(event.index, 0, event.data);
        },
        insert4(event) {
            this.merge2.splice(event.index, 0, event.data);
        },
        // data
        async loadPriceLevel(num) {
            this.showLoading = true;
            const strFilter = "?nature=sale";
            priceLevelHandler.get(strFilter).then((res) => {
                this.showLoading = false;
                this.priceLevels = res;
                if(num == 1){
                    this.loadProductPriceLevel()
                }
            });
        },
        loadProductPriceLevel(){
            this.priceProducts = []
            let i = 1
            let isLast = false
            this.priceLevels.forEach(e => {
                i++
                if(i == this.priceLevels.length){
                    isLast = true
                }
                let d = {
                    key: {},
                    priceLevelId: e.id
                }
                commerceHandler.getPLItem(d).then((res) => {
                    let data = res.data.data
                    if(data.Items.length > 0){
                        data.Items.forEach(e => {
                            this.priceProducts.push(e)
                        })
                    }
                    if(data.hasOwnProperty('LastEvaluatedKey')){
                        this.lastPPKey = data.LastEvaluatedKey
                        this.getPriceProMore(this.lastPPKey, e.id, isLast)
                    }else{
                        if(isLast){
                            this.bindPriceProduct()
                            this.loadPrice = true
                            this.checkPullDataComplete()
                        }
                    }
                });
                
            })
        },
        getPriceProMore(key, id, isLast){
            let d = {
                key: key,
                priceLevelId: id
            }
            commerceHandler.getPLItem(d).then((res) => {
                let data = res.data.data
                if(data.Items.length > 0){
                    // this.bindPriceProduct(data.Items)
                    data.Items.forEach(e => {
                        this.priceProducts.push(e)
                    })
                }
                if(data.hasOwnProperty('LastEvaluatedKey')){
                    this.lastPPKey = data.LastEvaluatedKey
                    this.getPriceProMore(this.lastPPKey, id, isLast)
                }else{
                    if(isLast){
                        this.bindPriceProduct()
                        this.loadPrice = true
                        this.checkPullDataComplete()
                    }
                }
            })
        },
        bindPriceProduct(){
            localStorage.setItem(instituteId + 'commRProductPrice', JSON.stringify(this.priceProducts))
        },
        // Setting
        loadSetting(){
            commerceHandler.settingGet().then((res) => {
                let d = res.data.data
                this.loadingSetting = true
                this.checkPullDataComplete()
                // for retail
                let set = d.filter((o) => {return o.type == 'retail'})
                if(set.length > 0){
                    this.addSetting(d[0])
                    this.g = new generalSettingModel(d[0])
                    this.startOrder()
                }else{
                    this.gotoSetting()
                }
            })
        },
        addSetting(data){
            localStorage.setItem(instituteId + 'commRSetting', JSON.stringify(data));
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
        isshowItem(){
            this.showCatePage = false
            this.showGroupPage = false
            this.showSupGroupPage = false
            this.showItem = true
        },
        // Category
        searchItemByCate(cateId){
            window.console.log(cateId)
            this.bindItems()
            this.loadingItmBlock = true
            setTimeout(() => {
                let itm = this.items.filter((o) => { return o.categoryId == cateId })
                if(itm.length > 0){
                    this.items = itm
                    this.loadingItmBlock = false
                    this.isshowItem()
                }else{
                    this.loadingItmBlock = false
                    this.msgNoData()
                }
            }, 500)
            
        },
        async loadCategory() {
            // categoryHandler.get().then((res) => {
            //     localStorage.setItem(instituteId + 'commRCategory', JSON.stringify(res));
            // });
            const param = {
                pattern: "grp",
            };
            groupHandler.getAllv2(param).then((res) => {
                localStorage.setItem(instituteId + 'commRCateGroup', JSON.stringify(res.data.data));
            });
            let p = {
                key: {},
                pattern: "sgr",
            }
            subGroupHandler.getv2(p).then((res) => {
                window.console.log(res.data.data, 'sub group')
                localStorage.setItem(instituteId + 'commRSubGroup', JSON.stringify(res.data.data));
            })
            this.loadAllProduct()
        },
        goCategory(){
            this.categories = this.g.usedCategory
            window.console.log(this.categories, 'go category')
            $.each(this.categories, function(i,v){
                window.console.log(v, 'border: 3px solid ' + v.color)
                v.borderColor = 'border: 3px solid ' + v.color
                v.titleColor = 'background-color: ' + v.color
            })
            this.showCatePage = true
            this.showGroupPage = false
            this.showSupGroupPage = false
            this.showItem = false
        },
        searchItemByGroup(id){
            window.console.log(id)
            this.bindItems()
            this.loadingItmBlock = true
            setTimeout(() => {
                let itm = this.items.filter((o) => { return o.groupId == id })
                if(itm.length > 0){
                    this.items = itm
                    this.loadingItmBlock = false
                    this.isshowItem()
                }else{
                    this.loadingItmBlock = false
                    this.msgNoData()
                }
            }, 500)
        },
        goGroup(){
            window.console.log(this.cateGroup, 'go group')
            $.each(this.cateGroup, function(i,v){
                v.borderColor = 'border: 3px solid ' + v.color
                v.titleColor = 'background-color: ' + v.color
            })
            this.showCatePage = false
            this.showGroupPage = true
            this.showSupGroupPage = false
            this.showItem = false
        },
        searchItemBySubGroup(id){
            window.console.log(id)
            this.bindItems()
            this.loadingItmBlock = true
            setTimeout(() => {
                let itm = this.items.filter((o) => { return o.subGroupId == id })
                if(itm.length > 0){
                    this.items = itm
                    this.loadingItmBlock = false
                    this.isshowItem()
                }else{
                    this.loadingItmBlock = false
                    this.msgNoData()
                }
            }, 500)
        },
        goSubGroup(){
            window.console.log(this.subGroup, 'go group')
            $.each(this.subGroup, function(i,v){
                v.borderColor = 'border: 3px solid ' + v.color
                v.titleColor = 'background-color: ' + v.color
            })
            this.showCatePage = false
            this.showGroupPage = false
            this.showSupGroupPage = true
            this.showItem = false
        },
        itemFavorite(){
            this.bindItems()
            this.loadingItmBlock = true
            setTimeout(() => {
                let itm = this.items.filter((o) => { return o.isFavorite == true })
                if(itm.length > 0){
                    this.items = itm
                    this.loadingItmBlock = false
                    this.isshowItem()
                }else{
                    this.loadingItmBlock = false
                    this.msgNoData()
                }
            }, 500)
        },
        msgNoData(){
            this.$snotify.error('No Item found!')
        },
        // Items
        async loadAllProduct(){
            let data = {
                key: {}
            }
            //load products
            this.showLoadingP = true
            this.allItems = []
            commerceHandler.getAllItem(data).then((res) => {
                let data = res.data.data
                if(data.Items.length > 0){
                    data.Items.forEach(e => {
                        this.allItems.push(e)
                    })
                }
                if(data.hasOwnProperty('LastEvaluatedKey')){
                    this.lastPKey = data.LastEvaluatedKey
                    this.getMoreItem(this.lastPKey)
                }else{
                    this.showLoadingP = false
                    this.bindAllItem()
                }
            });
        },
        bindAllItem(){
            localStorage.setItem(instituteId + 'commRProduct', JSON.stringify(this.allItems))
        },
        getMoreItem(key){
            let data = {
                key: key
            }
            commerceHandler.getAllItem(data).then((res) => {
                let data = res.data.data
                if(data.Items.length > 0){
                    data.Items.forEach(e => {
                        this.allItems.push(e)
                    })
                }
                if(data.hasOwnProperty('LastEvaluatedKey')){
                    this.lastPKey = data.LastEvaluatedKey
                    this.getMoreItem(this.lastPKey)
                }else{
                    this.showLoadingP = false
                    this.bindAllItem()
                }
            })
        },
        autoCalculate() {
            // let ds = this.$refs.lineDS.kendoWidget(),
            let subTotal = 0,
                totalTax = 0,
                discountTotal = 0,
                otherChargeTotal = 0,
                spTax = 0,
                pltax = 0,
                otherTax = 0,
                vatTax = 0,
                discountInvoice = 0,
                taxList = [],
                taxListDetail = [],
                discountItem = [],
                otherChargeItem = [],
                saleUnit = [],
                inclusiveTax = 0,
                discountLine = [],
                otherChargeLine = [],
                saleUnitLine = [],
                itemSubtotal = 0,
                txnItmSubtotal = 0,
                serviceSubtotal = 0,
                itemDiscount = 0,
                serviceDiscount = 0,
                txnDiscount = 0;
            let nature = "";
            this.jRaw = [];
            
            const rows = this.lineDS.filter((m) => parseFloat(m.amount) > 0); // ds.data().filter((m) => parseFloat(m.amount) > 0);
            rows.forEach((value) => {
                let modifierPrice = 0;
                let inclusiveTaxAmt = 0;
                let vatSpTax = {},
                vatPLTax = {},
                vatOtherTax = {};
                if (value.modifier.hasOwnProperty('price')) {
                    modifierPrice = kendo.parseFloat(value.modifier.price);
                    window.console.log(modifierPrice, 'modi price')
                }

                // subTotal += (kendo.parseFloat(value.amount) + modifierPrice)
                let discount = 0,
                otherCharge = 0;
                const otherChargeField = value.otherChargeItem || {};
                const otherChargeFieldAcc = otherChargeField.account || {};
                const otherChargeFieldAccId = otherChargeFieldAcc.uuid || "";
                if (value.otherChargeItem) {
                const subTotal =
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                otherCharge = this.autoCalculateDiscount(otherChargeField, subTotal);
                value["otherChargeAmount"] = otherCharge;
                value["otherChargeExchangeAmount"] =
                    otherCharge * kendo.parseFloat(this.invoice.txnRate);
                if (value.otherChargeItem.hasOwnProperty("id")) {
                    otherChargeItem.push(value.otherChargeItem);
                    otherChargeLine.push({
                    id: value.otherChargeItem.id,
                    name: value.otherChargeItem.name,
                    amount: otherCharge,
                    account: value.otherChargeItem.account || {},
                    exchangeAmount: otherCharge * parseFloat(this.invoice.txnRate),
                    });
                }
                otherChargeTotal += otherCharge || 0;
                if (otherCharge * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                if (otherChargeFieldAcc) {
                    if (otherChargeFieldAccId !== "") {
                    const account = this.mappingAccount(
                        this.coa,
                        otherChargeFieldAccId
                    );
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        description: "Other Charge",
                        account: account,
                        accountId: account.id,
                        amount: otherCharge * -1,
                        exchangeAmount:
                        otherCharge * -1 * kendo.parseFloat(this.invoice.txnRate),
                        type: nature,
                        typeAs: "otherCharge",
                    });
                    }
                }
                }
                if (value.discountItem) {
                const disItemField = value.discountItem;
                const subTo =
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                discount = this.autoCalculateDiscount(value.discountItem, subTo);
                value["discountAmount"] = discount;
                value["discountExchangeAmount"] =
                    discount * kendo.parseFloat(this.invoice.txnRate);
                // window.console.log('value', JSON.stringify(value))
                if (value.discountItem.hasOwnProperty("id")) {
                    discountItem.push(value.discountItem);
                    discountLine.push({
                    id: value.discountItem.id,
                    name: value.discountItem.name,
                    amount: discount,
                    exchangeAmount: discount * parseFloat(this.invoice.txnRate),
                    });
                }
                discountTotal += discount || 0;
                if (discount > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                if (disItemField.account) {
                    if (disItemField.account.hasOwnProperty("id")) {
                    const disItemFieldAcc = disItemField.account || {};
                    const account = this.mappingAccount(this.coa, disItemFieldAcc.id);
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: "Discount",
                        account: account,
                        accountId: account.id,
                        amount: discount,
                        exchangeAmount:
                        discount * kendo.parseFloat(this.invoice.txnRate),
                        type: nature,
                        typeAs: "discount",
                    });
                    }
                }
                }
                if (value.saleUnit) {
                if (value.saleUnit.hasOwnProperty("id")) {
                    saleUnit.push(value.saleUnit);
                    const item_ = value.item || {};
                    const amount_ =
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty) || 0;
                    const itemObj = {
                    id: item_.id || "",
                    name: item_.name || "",
                    amount: amount_ - (discount || 0),
                    sku: item_.sku || ''
                    };
                    saleUnitLine.push({
                    lineId: value.id || "",
                    id: value.saleUnit.id,
                    name: value.saleUnit.name,
                    category: value.saleUnit.category,
                    item: itemObj,
                    amount: itemObj.amount,
                    exchangeAmount: itemObj.amount * (this.invoice.txnRate || 1),
                    discount: discount || 0,
                    exchangeDiscount: (discount || 0) * (this.invoice.txnRate || 1),
                    });
                }
                }
                if (value.specificTax) {
                const spTaxNoDiscount = this.autoCalculateTax(
                    value.specificTax,
                    kendo.parseFloat(value.amount)
                );
                spTax = this.autoCalculateTax(
                    value.specificTax,
                    kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                );
                spTax = kendo.parseFloat(spTax) ? kendo.parseFloat(spTax) : 0;
                value["specificTaxAmount"] = spTax;
                value["specificTaxExchangeAmount"] =
                    spTax * kendo.parseFloat(this.invoice.txnRate);
                const tax = value.specificTax;
                const baseAmount = tax.baseAmount;
                if (baseAmount) {
                    if (baseAmount.toLowerCase() === "inclusive") {
                    inclusiveTax += spTax;
                    window.console.log("spTaxNoDiscount", spTaxNoDiscount);
                    inclusiveTaxAmt += kendo.parseFloat(spTaxNoDiscount || 0);
                    }
                }
                // window.console.log(value.specificTax)
                if (value.specificTax.hasOwnProperty("taxType")) {
                    taxList.push({
                    name: value.specificTax.taxType.name,
                    amount: spTax,
                    id: value.specificTax.taxType.id,
                    });
                    const spTax_ = value.specificTax || {};
                    // spTax_['taxAmount'] = spTax
                    spTax_["taxAmount_"] = spTax;
                    spTax_["amount"] = value.amount || 0;
                    spTax_["discount"] = discount || 0;
                    spTax_["txnRate"] = this.invoice.txnRate || 1;
                    // delete tax_['account']
                    taxListDetail.push(spTax_);
                    vatSpTax = spTax_;
                }
                if (spTax * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                const specificTaxField = value.specificTax;
                if (specificTaxField.account) {
                    if (specificTaxField.account.hasOwnProperty("id")) {
                    const specificTaxFieldAcc = specificTaxField.account || {};
                    const account = this.mappingAccount(
                        this.coa,
                        specificTaxFieldAcc.id
                    );
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: "Tax",
                        account: account,
                        accountId: account.id,
                        amount: spTax * -1,
                        exchangeAmount:
                        spTax * -1 * kendo.parseFloat(this.invoice.txnRate),
                        type: nature,
                        typeAs: "tax",
                    });
                    }
                }
                }
                if (value.publicLightingTax) {
                const pltaxNoDiscount = this.autoCalculateTax(
                    value.publicLightingTax,
                    kendo.parseFloat(value.amount)
                );
                pltax = this.autoCalculateTax(
                    value.publicLightingTax,
                    kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                );
                pltax = kendo.parseFloat(pltax) ? kendo.parseFloat(pltax) : 0;
                value["publicLightingTaxAmount"] = pltax;
                value["publicLightingTaxExchangeAmount"] =
                    pltax * kendo.parseFloat(this.invoice.txnRate);
                const tax = value.publicLightingTax;
                const baseAmount = tax.baseAmount;
                if (baseAmount) {
                    if (baseAmount.toLowerCase() === "inclusive") {
                    inclusiveTax += pltax;
                    window.console.log("pltaxNoDiscount", pltaxNoDiscount);
                    inclusiveTaxAmt += kendo.parseFloat(pltaxNoDiscount || 0);
                    }
                }
                if (value.publicLightingTax.hasOwnProperty("taxType")) {
                    taxList.push({
                    name: value.publicLightingTax.taxType.name,
                    amount: pltax,
                    id: value.publicLightingTax.taxType.id,
                    });
                    const plTax_ = value.publicLightingTax || {};
                    // plTax_['taxAmount'] = pltax
                    plTax_["taxAmount_"] = pltax;
                    plTax_["amount"] = value.amount || 0;
                    plTax_["discount"] = discount || 0;
                    plTax_["txnRate"] = this.invoice.txnRate || 1;
                    // delete tax_['account']
                    taxListDetail.push(plTax_);
                    vatPLTax = plTax_;
                }
                if (pltax * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                const PLTaxField = value.publicLightingTax;
                if (PLTaxField.account) {
                    if (PLTaxField.account.hasOwnProperty("id")) {
                    const PLTaxFieldAcc = PLTaxField.account || {};
                    const account = this.mappingAccount(this.coa, PLTaxFieldAcc.id);
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: "Tax",
                        account: account,
                        accountId: account.id,
                        amount: pltax * -1,
                        exchangeAmount:
                        pltax * kendo.parseFloat(this.invoice.txnRate) * -1,
                        type: nature,
                        typeAs: "tax",
                    });
                    }
                }
                }
                if (value.otherTax) {
                const otherTaxNoDiscount = this.autoCalculateTax(
                    value.otherTax,
                    kendo.parseFloat(value.amount)
                );
                otherTax = this.autoCalculateTax(
                    value.otherTax,
                    kendo.parseFloat(value.amount) - kendo.parseFloat(discount)
                );
                otherTax = kendo.parseFloat(otherTax)
                    ? kendo.parseFloat(otherTax)
                    : 0;
                value["otherTaxAmount"] = otherTax;
                value["otherTaxExchangeAmount"] =
                    otherTax * kendo.parseFloat(this.invoice.txnRate);
                const tax = value.otherTax;
                const baseAmount = tax.baseAmount;
                if (baseAmount) {
                    if (baseAmount.toLowerCase() === "inclusive") {
                    inclusiveTax += otherTax;
                    window.console.log("otherTaxNoDiscount", otherTaxNoDiscount);
                    inclusiveTaxAmt += kendo.parseFloat(otherTaxNoDiscount || 0);
                    }
                }
                if (value.otherTax.hasOwnProperty("taxType")) {
                    taxList.push({
                    name: value.otherTax.taxType.name,
                    amount: otherTax,
                    id: value.otherTax.taxType.id,
                    });
                    const tax__ = value.otherTax || {};
                    // tax__['taxAmount'] = otherTax
                    tax__["taxAmount_"] = otherTax;
                    tax__["amount"] = value.amount || 0;
                    tax__["discount"] = discount || 0;
                    tax__["txnRate"] = this.invoice.txnRate || 1;
                    // delete tax_['account']
                    taxListDetail.push(tax__);
                    vatOtherTax = tax__;
                }
                if (otherTax * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                const otherTaxField = value.otherTax || {};
                if (otherTaxField.account) {
                    if (otherTaxField.account.hasOwnProperty("id")) {
                    const otherTaxFieldAcc = otherTaxField.account || {};
                    const account = this.mappingAccount(
                        this.coa,
                        otherTaxFieldAcc.id
                    );
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: "Tax",
                        account: account,
                        accountId: account.id,
                        amount: otherTax * -1,
                        exchangeAmount:
                        otherTax * kendo.parseFloat(this.invoice.txnRate) * -1,
                        type: nature,
                        typeAs: "tax",
                    });
                    }
                }
                }

                if (value.vatTax) {
                // window.console.log('Vat Tax', value.vatTax)
                const amtNoDiscount =
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    kendo.parseFloat(value.amount ? value.amount : 0);
                let amt =
                    kendo.parseFloat(spTax ? spTax : 0) +
                    kendo.parseFloat(pltax ? pltax : 0) +
                    kendo.parseFloat(otherTax ? otherTax : 0) +
                    (kendo.parseFloat(value.amount ? value.amount : 0) -
                    (discount ? discount : 0));
                const vatTaxNoDiscount = this.autoCalculateTax(
                    value.vatTax,
                    amtNoDiscount
                );
                vatTax = this.autoCalculateTax(value.vatTax, amt);
                vatTax = kendo.parseFloat(vatTax) ? kendo.parseFloat(vatTax) : 0;
                value["vatTaxAmount"] = vatTax;
                value["vatTaxExchangeAmount"] =
                    vatTax * kendo.parseFloat(this.invoice.txnRate);
                const tax = value.vatTax;
                const baseAmount = tax.baseAmount;
                if (baseAmount) {
                    if (baseAmount.toLowerCase() === "inclusive") {
                    inclusiveTax += vatTax;
                    window.console.log("vatTaxNoDiscount", vatTaxNoDiscount);
                    inclusiveTaxAmt += kendo.parseFloat(vatTaxNoDiscount || 0);
                    }
                }
                if (value.vatTax.hasOwnProperty("taxType")) {
                    taxList.push({
                    name: value.vatTax.taxType.name,
                    amount: vatTax,
                    id: value.vatTax.taxType.id,
                    });
                    const vatTax_ = value.vatTax || {};
                    // vatTax_['taxAmount'] = vatTax
                    vatTax_["taxAmount_"] = vatTax;
                    vatTax_["amount"] = value.amount || 0;
                    vatTax_["discount"] = discount || 0;
                    vatTax_["txnRate"] = this.invoice.txnRate || 1;
                    vatTax_["isVat"] = 1;
                    vatTax_.detail = {
                    specificTax: vatSpTax,
                    publicLightingTax: vatPLTax,
                    otherTax: vatOtherTax,
                    };
                    // delete tax_['account']
                    taxListDetail.push(vatTax_);
                }

                if (vatTax * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                const vatTaxField = value.vatTax;
                if (vatTaxField.account) {
                    if (vatTaxField.account.hasOwnProperty("id")) {
                    const vatTaxFieldAcc = vatTaxField.account || {};
                    const account = this.mappingAccount(this.coa, vatTaxFieldAcc.id);
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: "Tax",
                        account: account,
                        accountId: account.id,
                        amount: vatTax * -1,
                        exchangeAmount:
                        vatTax * kendo.parseFloat(this.invoice.txnRate) * -1,
                        type: nature,
                        typeAs: "tax",
                    });
                    }
                }
                }
                (vatSpTax = {}), (vatPLTax = {}), (vatOtherTax = {});
                totalTax +=
                kendo.parseFloat(spTax ? spTax : 0) +
                kendo.parseFloat(pltax ? pltax : 0) +
                kendo.parseFloat(otherTax ? otherTax : 0) +
                kendo.parseFloat(vatTax ? vatTax : 0);
                subTotal +=
                kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;
                window.console.log(kendo.parseFloat(value.amount), modifierPrice, inclusiveTax, 'before amt')
                const amt = kendo.parseFloat(value.amount) + modifierPrice - inclusiveTax;
                const xAmount = kendo.parseFloat(amt) * kendo.parseFloat(this.invoice.txnRate) * -1;
                const item = value.item;
                const itmType = item.type || "";
                if (itmType === "Variant") {
                itemSubtotal +=
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                itemDiscount += kendo.parseFloat(discount);
                } else if (itmType === "Service") {
                serviceSubtotal +=
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                itemDiscount += kendo.parseFloat(discount);
                } else {
                txnItmSubtotal +=
                    kendo.parseFloat(value.price) * kendo.parseFloat(value.qty);
                itemDiscount += kendo.parseFloat(discount);
                }

                const conversionRate = value.conversionRate || 1;
                const bQty = parseFloat(value.qty * conversionRate);
                const wac = parseFloat(value.wac) || 0;
                const itemAmount = parseFloat(bQty) * wac;
                // const itemxAmount = itemAmount
                if (amt * -1 > 0) {
                nature = "dr";
                } else {
                nature = "cr";
                }
                if (item) {
                if (item.type === "Service") {
                    if (value.isPlan) {
                    if (item.hasOwnProperty("deferredIncomeAcc")) {
                        if (item.deferredIncomeAcc.hasOwnProperty("id")) {
                        const deferredInAcc = item.deferredIncomeAcc || {};
                        const account = this.mappingAccount(
                            this.coa,
                            deferredInAcc.id
                        );
                        this.jRaw.push({
                            id: account.id + "-" + nature,
                            // line: new ItemLineModel(value),
                            description: this.invoice.journalNote,
                            account: account,
                            accountId: account.id,
                            amount: amt * -1,
                            exchangeAmount: xAmount,
                            type: nature,
                            typeAs: "item",
                        });
                        }
                    }
                    } else {
                    const incomeAcc = item.incomeAcc || {};
                    if (item.hasOwnProperty("incomeAcc")) {
                        if (item.incomeAcc.hasOwnProperty("id")) {
                        const account = this.mappingAccount(this.coa, incomeAcc.id);
                        this.jRaw.push({
                            id: account.id + "-" + nature,
                            // line: new ItemLineModel(value),
                            description: this.invoice.journalNote,
                            account: account,
                            accountId: account.id,
                            amount: amt * -1,
                            exchangeAmount: xAmount,
                            type: nature,
                            typeAs: "item",
                            cashBasic: 1,
                        });
                        }
                    }
                    }
                } else if (item.type === "Variant") {
                    if (item.hasOwnProperty("incomeAcc")) {
                    if (item.incomeAcc.hasOwnProperty("id")) {
                        const incomeAcc = item.incomeAcc || {};
                        const account = this.mappingAccount(this.coa, incomeAcc.id);
                        this.jRaw.push({
                            id: account.id + "-" + nature,
                            // line: new ItemLineModel(value),
                            description: this.invoice.journalNote,
                            account: account,
                            accountId: account.id,
                            amount: amt * -1,
                            exchangeAmount: xAmount,
                            type: nature,
                            typeAs: "item",
                            cashBasic: 1,
                        });
                    }
                    }
                    if (item.hasOwnProperty("inventoryAcc")) {
                    if (item.inventoryAcc.hasOwnProperty("id")) {
                        const inventoryAcc = item.inventoryAcc || {};
                        const account = this.mappingAccount(this.coa, inventoryAcc.id);
                        this.jRaw.push({
                        id: inventoryAcc.id + "-" + "cr",
                        // line: new ItemLineModel(value),
                        description: this.invoice.journalNote,
                        account: account,
                        accountId: account.id,
                        amount: itemAmount * -1, // qty*avg_cost ,
                        exchangeAmount: itemAmount * -1, //xAmount,
                        type: "cr",
                        typeAs: "item",
                        });
                    }
                    }
                    if (item.hasOwnProperty("costOfGoodsSoldAcc")) {
                    if (item.costOfGoodsSoldAcc.hasOwnProperty("id")) {
                        const costOfGoodsSoldAcc = item.costOfGoodsSoldAcc || {};
                        const account = this.mappingAccount(
                        this.coa,
                        costOfGoodsSoldAcc.id
                        );
                        this.jRaw.push({
                        id: account.id + "-" + "dr",
                        // line: new ItemLineModel(value),
                        description: this.invoice.journalNote,
                        account: account,
                        accountId: account.id,
                        amount: itemAmount, // qty*avg_cost ,
                        exchangeAmount: itemAmount, //xAmount,
                        type: "dr",
                        typeAs: "item",
                        });
                    }
                    }
                } else if (item.type === "Fixed Asset") {
                    if (item.hasOwnProperty("assetAcc")) {
                    if (item.assetAcc.hasOwnProperty("id")) {
                        const assetAcc = item.assetAcc || {};
                        const account = this.mappingAccount(this.coa, assetAcc.id);
                        this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: this.invoice.journalNote,
                        account: account,
                        accountId: account.id,
                        amount: amt * -1,
                        exchangeAmount: xAmount,
                        type: nature,
                        typeAs: "item",
                        });
                    }
                    }
                } else if (item.type === "Transaction Item") {
                    if (item.hasOwnProperty("account")) {
                    if (item.account.hasOwnProperty("id")) {
                        const account_ = item.account || {};
                        const account = this.mappingAccount(this.coa, account_.id);
                        this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel(value),
                        description: this.invoice.journalNote,
                        account: account,
                        accountId: account.id,
                        amount: amt * -1,
                        exchangeAmount: xAmount,
                        type: nature,
                        typeAs: "item",
                        });
                    }
                    }
                }
                }
                value["amountWithoutTax"] =
                kendo.parseFloat(value.amount) - inclusiveTaxAmt;
                window.console.log(
                "ItemLine",
                value,
                "-",
                inclusiveTaxAmt,
                "--",
                kendo.parseFloat(value.price) * kendo.parseFloat(value.qty)
                );
                //include Tax Amount
                const amountNodiscount =
                kendo.parseFloat(value.price) * kendo.parseFloat(value.qty) -
                discount;
                const includeTaxAmount =
                amountNodiscount + vatTax + pltax + spTax + otherTax;
                value["includeTaxAmount"] = includeTaxAmount;
                value["includeTaxExchangeAmount"] =
                includeTaxAmount * kendo.parseFloat(this.invoice.txnRate);
            });
            this.invoice.itemSubtotal = itemSubtotal;
            this.invoice.exchangeItemSubtotal =
                itemSubtotal * kendo.parseFloat(this.invoice.txnRate);
            this.invoice.serviceSubtotal = serviceSubtotal;
            this.invoice.exchangeServiceSubtotal =
                serviceSubtotal * kendo.parseFloat(this.invoice.txnRate);
            this.invoice.txnItmSubtotal = txnItmSubtotal;
            this.invoice.exchangeTxnItmSubtotal =
                txnItmSubtotal * kendo.parseFloat(this.invoice.txnRate);
            this.invoice.itemDiscount = itemDiscount;
            this.invoice.exchangeItemDiscount =
                itemDiscount * kendo.parseFloat(this.invoice.txnRate);
            this.invoice.serviceDiscount = serviceDiscount;
            this.invoice.exchangeServiceDiscount =
                serviceDiscount * kendo.parseFloat(this.invoice.txnRate);
            this.invoice.txnItmDiscount = txnDiscount;
            this.invoice.exchangeTxnItmDiscount =
                txnDiscount * kendo.parseFloat(this.invoice.txnRate);
            // window.console.log(spTax, pltax, otherTax, vatTax)
            let total =
                kendo.parseFloat(subTotal) -
                kendo.parseFloat(discountTotal) +
                kendo.parseFloat(totalTax);
            this.invoice.subTotal = subTotal;
            this.invoice.exchangeSubTotal =
                subTotal * parseFloat(this.invoice.txnRate);
            // $("#subtotal").text(kendo.parseFloat(subTotal))
            this.invoice.totalTaxAmount = kendo.parseFloat(totalTax);
            this.invoice.discountTotal = kendo.parseFloat(discountTotal);
            this.invoice.otherChargeTotal = kendo.parseFloat(otherChargeTotal);
            if (this.invoice.specificDiscountItem) {
                discountInvoice = this.autoCalculateDiscount(
                this.invoice.specificDiscountItem,
                kendo.parseFloat(subTotal)
                );
                discountInvoice = discountInvoice ? discountInvoice : 0;
            }
            // this.onOtherChargeChange()
            this.invoice.total =
                kendo.parseFloat(total) -
                discountInvoice +
                kendo.parseFloat(this.invoice.otherChargeAmount) +
                otherChargeTotal;
            this.invoice.remainingAmount =
                kendo.parseFloat(this.invoice.total) -
                kendo.parseFloat(this.invoice.depositDeduction);
            this.invoice.amountDue =
                kendo.parseFloat(this.invoice.total) -
                kendo.parseFloat(this.invoice.depositDeduction);
            this.invoice.exchangeAmount =
                kendo.parseFloat(this.invoice.amountDue) *
                kendo.parseFloat(this.invoice.txnRate);
            // window.console.log('Exchange Amount', this.invoice.exchangeAmount)
            this.autoCalculateTaxByType(taxList);
            if (this.invoice.specificDiscountItem) {
                const specificDiscount = this.invoice.specificDiscountItem || {};
                if (specificDiscount.id) {
                discountItem.push(specificDiscount);
                discountLine.push({
                    id: specificDiscount.id,
                    name: specificDiscount.name,
                    account: specificDiscount.account || {},
                    amount: this.invoice.specificDiscountTotal,
                    exchangeAmount:
                    this.invoice.specificDiscountTotal * this.invoice.txnRate,
                });
                }
            }
            const uniqueDiscountItem = this.removeDuplicate(discountItem);
            this.shrinkDiscountItem(uniqueDiscountItem, discountLine);

            const uniqueOtherCharge = this.removeDuplicate(otherChargeItem);
            this.shrinkOtherChargeItem(uniqueOtherCharge, otherChargeLine);

            this.customerSaleUnit = this.removeDuplicate(saleUnit);
            this.customerSaleUnitLine = saleUnitLine; //this.removeDuplicate(saleUnit)
            this.taxListDetail = taxListDetail;
            // window.console.log('taxListDetail--', taxListDetail)
            // todo: raw Journal
            const receivableAcc = this.invoice.receivableAcc || {};
            if (this.invoice.amountDue > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            if (receivableAcc) {
                if (receivableAcc.hasOwnProperty("id")) {
                const account = this.mappingAccount(this.coa, receivableAcc.id);
                const accountId = account.id || "";
                this.jRaw.push({
                    id: accountId + "-" + nature,
                    // line: new ItemLineModel({}),
                    description: this.invoice.journalNote,
                    account: account,
                    accountId: accountId,
                    exchangeAmount: this.invoice.exchangeAmount || 0,
                    amount: this.invoice.amountDue || 0,
                    type: nature,
                    typeAs: "ar",
                });
                }
            }
            const specificDisc = this.invoice.specificDiscountItem;
            if (this.invoice.specificDiscountTotal > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            if (specificDisc) {
                if (specificDisc.hasOwnProperty("account")) {
                if (specificDisc.account) {
                    if (specificDisc.hasOwnProperty("id")) {
                    const specificDiscAcc = specificDisc.account || {};
                    const account = this.mappingAccount(this.coa, specificDiscAcc.id);
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        // line: new ItemLineModel({}),
                        description: "Discount",
                        account: account || {},
                        accountId: account.id,
                        exchangeAmount:
                        kendo.parseFloat(this.invoice.specificDiscountTotal) *
                        kendo.parseFloat(this.invoice.txnRate),
                        amount: this.invoice.specificDiscountTotal,
                        type: nature,
                        typeAs: "discount",
                    });
                    }
                }
                }
            }

            if (this.invoice.depositDeduction > 0) {
                nature = "dr";
            } else {
                nature = "cr";
            }
            this.invoice.exchangeDepositDeduction =
                (this.invoice.txnRate || 0) * this.invoice.depositDeduction;
            if (this.invoice.depositDeduction) {
                if (this.invoice.depositDeduction > 0) {
                const saleDepositAcc = this.customer.saleDepositAcc || {};
                if (saleDepositAcc) {
                    if (saleDepositAcc.hasOwnProperty("id")) {
                    const account = this.mappingAccount(this.coa, saleDepositAcc.id);
                    this.jRaw.push({
                        id: account.id + "-" + nature,
                        description: "Deposit",
                        // line: new ItemLineModel({}),
                        account: account,
                        accountId: account.id,
                        exchangeAmount: this.invoice.exchangeDepositDeduction,
                        amount: this.invoice.depositDeduction,
                        type: nature,
                        typeAs: "deposit",
                    });
                    }
                }
                }
            }
            if (this.mOtherCharge.length > 0) {
                let otherCharge = 0;
                this.mOtherCharge.forEach((m) => {
                otherCharge = this.autoCalculateDiscount(m, this.invoice.subTotal);
                if (otherCharge * -1 > 0) {
                    nature = "dr";
                } else {
                    nature = "cr";
                }
                if (m) {
                    if (m.hasOwnProperty("account")) {
                    if (m.account.hasOwnProperty("id")) {
                        const account = m.account || {};
                        const account_ = this.mappingAccount(this.coa, account.id);
                        if (account) {
                        if (account.hasOwnProperty("id")) {
                            this.jRaw.push({
                            id: account_.id + "-" + nature,
                            // line: new ItemLineModel({}),
                            description: "Other Charge",
                            account: account_,
                            accountId: account_.id,
                            exchangeAmount:
                                otherCharge *
                                kendo.parseFloat(this.invoice.txnRate) *
                                -1,
                            amount: otherCharge * -1,
                            type: nature,
                            typeAs: "otherCharge",
                            });
                        }
                        }
                    }
                    }
                }
                });
                // this.invoice.otherChargeAmount = otherCharge

                window.console.log(this.mOtherCharge);
            }
            this.autoCalculateTaxDetail();
            // todo: end raw Journal
            // window.console.log(JSON.stringify(this.accounts), 'accounts')
            this.shrinkData(this.jRaw);
            // const unique = this.removeDuplicate(this.accounts)
            // window.console.log(unique, 'unique')
            window.console.log(this.jRaw, 'journal')
        },
        autoCalculateDiscount(discountItem, subTotal) {
            if (discountItem) {
                const nature = discountItem.nature || "";
                const amount = discountItem.amount || 0;
                if (nature === "Amount") {
                    return parseFloat(amount);
                } else if (nature === "Percentage") {
                    return subTotal * (parseFloat(amount) / 100);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        shrinkData(obj) {
            const uniques =
                this.removeDuplicate(obj); /*[...new Set(accountId.map(i => {
                        return {
                            id_: i.id_,
                            id: i.id,
                            type: i.type
                        }
                    }))]*/
            /* todo: cash basic account */
            let cashBasicAmount = 0;
            let xCashBasicAmount = 0;
            this.invoice.cashBasicIncomeAcc = [];
            let cashBasicAcc = uniques.filter((m) => m.cashBasic === 1);
            cashBasicAcc.forEach((k) => {
                cashBasicAmount += k.amount;
                xCashBasicAmount += k.exchangeAmount;
            });
            cashBasicAcc.map((o) => {
                o["amountPercentage"] = o.amount / cashBasicAmount;
                o["xAmountPercentage"] = o.exchangeAmount / xCashBasicAmount;
            });
            this.invoice.cashBasicIncomeAcc = cashBasicAcc;
            /* todo: end */
            uniques.forEach((n) => {
                const found = obj.filter((m) => m.id === n.id);
                let amount = 0,
                xAmount = 0;
                found.forEach((z) => {
                amount += parseFloat(z.amount || 0);
                xAmount += parseFloat(z.exchangeAmount || 0);
                });
                n.amount = parseFloat(amount); //this.numberFormat(amount)
                n.exchangeAmount = parseFloat(xAmount); //parseFloat(parseFloat(amount * parseFloat(this.invoice.txnRate))) //this.numberFormat(amount * parseFloat(this.invoice.txnRate)) //.toFixed(this.saleFormContent.decimal)
            });
            this.jRaw = uniques;
            let dr = 0,
                cr = 0;
            this.jRaw.forEach((j) => {
                switch (j.type) {
                case "cr":
                    cr += parseFloat(j.amount);
                    break;
                case "dr":
                    dr += parseFloat(j.amount);
                    break;
                default:
                    break;
                }
            });
            this.invoice.dr = dr;
            this.invoice.cr = cr;
            window.console.log("dr=", dr, "cr=", cr, "dr+cr = ", dr + cr);
            window.console.log(JSON.stringify(uniques), "uniques");
        },
        autoCalculateTaxByType(tax) {
            // return by a key
            const groupAll = (list) =>
                list.reduce((tax, item) => {
                const taxAmount = tax[item.name] || 0;
                return Object.assign({}, tax, {
                    [item.name]: taxAmount + parseFloat(item.amount),
                });
                }, {});
            this.taxListTotal = groupAll(tax);
            // window.console.log('nimol', groupAll(tax))
        },
        autoCalculateTaxDetail() {
            let ids = [];
            this.taxListDetail.forEach((n) => {
                ids.push(n.id || "");
            });
            const unique = [...new Set(ids)];
            let result = [];
            unique.forEach((m) => {
                let amount = 0,
                row = {},
                discount = 0,
                xDiscount = 0,
                xAmount = 0,
                taxAmount = 0,
                xTaxAmount = 0;
                let taxDetail = [],
                isVat = 0;
                const found = this.taxListDetail.filter((n) => n.id === m);
                // window.console.log('taxListDetailids', found)
                found.forEach((k) => {
                row = k;
                if (k.isVat === 1) {
                    isVat = 1;
                    const detail_ = k.detail || {};
                    taxDetail.push(detail_);
                }
                taxAmount += k.taxAmount_ || 0;
                xTaxAmount += (k.taxAmount_ || 0) * (k.txnRate || 1);
                amount += k.amount || 0;
                xAmount += (k.amount || 0) * (k.txnRate || 1);
                discount += k.discount || 0;
                xDiscount += (k.discount || 0) * (k.txnRate || 1);
                });
                let spTaxAmt = 0,
                spXTaxAmt = 0,
                plTaxAmt = 0,
                plXTaxAmt = 0,
                otTaxAmt = 0,
                otXTaxAmt = 0,
                spTaxName = "",
                plTaxName = "",
                otTaxName = "",
                spTaxNameLocale = "",
                plTaxNameLocale = "",
                otTaxNameLocale = "",
                spAccId = "",
                plAccId = "",
                otAccId = "",
                spRate = "",
                plRate = "",
                otRate = "";
                taxDetail.forEach((n) => {
                const spTax = n.specificTax || {};
                const plTax = n.publicLightingTax || {};
                const otherTax = n.otherTax || {};
                if (Object.keys(spTax).length > 0) {
                    spTaxAmt += spTax.taxAmount_ || 0;
                    spXTaxAmt += (spTax.taxAmount_ || 0) * (spTax.taxRate || 1);
                    spTaxName = spTax.defaultTax || "";
                    spTaxNameLocale = spTax.defaultTaxLocale || "";
                    spAccId = spTax.account ? spTax.account.id : "";
                    spRate = spTax.rate || 1;
                }
                if (Object.keys(plTax).length > 0) {
                    plTaxAmt += plTax.taxAmount_ || 0;
                    plXTaxAmt += (plTax.taxAmount_ || 0) * (plTax.taxRate || 1);
                    plTaxName = plTax.defaultTax || "";
                    plTaxNameLocale = plTax.defaultTaxLocale || "";
                    plAccId = plTax.account ? plTax.account.id : "";
                    plRate = plTax.rate || 1;
                }
                if (Object.keys(otherTax).length > 0) {
                    otTaxAmt += otherTax.taxAmount_ || 0;
                    otXTaxAmt += (otherTax.taxAmount_ || 0) * (plTax.taxRate || 1);
                    otTaxName = otherTax.defaultTax || "";
                    otTaxNameLocale = otherTax.defaultTaxLocale || "";
                    otAccId = otherTax.account ? otherTax.account.id : "";
                    otRate = otherTax.rate || 1;
                }
                });
                if (isVat === 1) {
                row.detail = {
                    specificTax: {
                    name: spTaxName,
                    nameLocale: spTaxNameLocale,
                    amount: spTaxAmt,
                    exchangeAmount: spXTaxAmt,
                    accountId: spAccId,
                    rate: spRate,
                    },
                    publicLightingTax: {
                    name: plTaxName,
                    nameLocale: plTaxNameLocale,
                    amount: plTaxAmt,
                    exchangeAmount: plXTaxAmt,
                    accountId: plAccId,
                    rate: plRate,
                    },
                    otherTax: {
                    name: otTaxName,
                    nameLocale: otTaxNameLocale,
                    amount: otTaxAmt,
                    exchangeAmount: otXTaxAmt,
                    accountId: otAccId,
                    rate: otRate,
                    },
                };
                } else {
                row.detail = {};
                }

                row["amount"] = amount;
                row["exchangeAmount"] = xAmount;
                row["taxAmount"] = taxAmount;
                row["exchangeTaxAmount"] = xTaxAmount;
                row["discount"] = discount;
                row["exchangeDiscount"] = xDiscount;
                row["currency"] = this.invoice.exchangeRate || {};
                result.push(row);
                taxDetail = [];
            });
            this.invoice.saleTaxDetail = result;
            window.console.log("saleTaxDetail", result);
        },
        removeDuplicate(array) {
            const result = [];
            const map = new Map();
            for (const item of array) {
                if (!map.has(item.id)) {
                map.set(item.id, true); // set any value to Map
                result.push(item);
                }
            }
            return result;
        },
        shrinkDiscountItem(discountItem, discountLine) {
            let uniqueDiscountItems = [];
            const unique = this.removeDuplicate(discountItem);
            unique.forEach((m) => {
                const found = discountLine.filter((n) => n.id === m.id);
                let amount = 0,
                exchangeAmount = 0;
                found.map((o) => {
                amount += o.amount;
                });
                found.map((o) => {
                exchangeAmount += o.exchangeAmount;
                });
                uniqueDiscountItems.push({
                id: m.id,
                name: m.name,
                amount: amount,
                account: m.account,
                exchangeAmount: exchangeAmount,
                });
            });
            this.customerDiscountItem = uniqueDiscountItems;
            window.console.log(uniqueDiscountItems, "uniqueDiscountItems");
        },
        shrinkOtherChargeItem(otherChargeItem, otherChargeLine) {
            let items = [];
            const unique = this.removeDuplicate(otherChargeItem);
            unique.forEach((m) => {
                const found = otherChargeLine.filter((n) => n.id === m.id);
                let amount = 0,
                exchangeAmount = 0;
                found.map((o) => {
                amount += o.amount;
                });
                found.map((o) => {
                exchangeAmount += o.exchangeAmount;
                });
                items.push({
                id: m.id,
                name: m.name,
                amount: amount,
                account: m.account,
                exchangeAmount: exchangeAmount,
                });
            });
            this.customerOtherChargeItem = items;
        },
        autoCalculateTax(tax, amount) {
            if (tax) {
                var formula = tax.formula;
                var inAmt = kendo.parseFloat(amount);
                var nAmt = kendo.parseFloat(amount);
                var taxBase = kendo.parseFloat(tax.taxBase) / 100;
                var rate = kendo.parseFloat(tax.rate) / 100;
                var total = eval(formula);
                window.console.log(inAmt, nAmt, taxBase, rate, formula, total);
                return total;
            }
            // return 0
        },
        mappingAccount(coa, uuid) {
            const account = coa.filter((k) => k.uuid === uuid);
            return account.map((j) => {
                j.id = j.uuid;
                return {
                ...j,
                };
            })[0];
        },
        numberFormat(value) {
            return kendo.toString(value, `n${this.saleFormContent.decimal}`);
        },
        //pull data
        async pullData(){
            this.loadPullData = true
            this.loadingSetting = false
            this.loadPrice = false
            localStorage.clear();
            await this.loadSetting()
            await this.loadCategory()
            await this.loadPriceLevel(1)
            localStorage.setItem(instituteId + 'commRActiveDate', new Date().toISOString().substr(0, 10))
            localStorage.setItem(instituteId + 'commRPullDataAt', new Date().getTime())
        },
        checkPullDataComplete(){
            if(this.loadingSetting && this.loadPrice){
                setTimeout(() => {
                    this.loadPullData = false
                    window.location.reload()
                }, 5000)
            }
        },
        startOrder(){
            this.checkOrderFlow()
        },
        startOrderFlow(){
            if(this.startFlowAt <= this.g.orderFlow.length){
                this.checkOrderShow(this.g.orderFlow[this.startFlowAt].name)
                this.startOrderAdd()
            }
        },
        checkOrderShow(func){
            switch(func) {
                case 'pin':
                    this.pinActivate = true
                    break;
                case 'guestCount':
                    window.console.log('guestcount')
                    this.dialogCountGuest = true
                    break;
                case 'loyalty':
                    window.console.log('loyalty')
                    this.dialogLoyalty = true
                    break;
                case 'orderType':
                    window.console.log('orderType')
                    this.dialogOrderType = true
                    break;
                case 'partner':
                    window.console.log('partner')
                    this.dialogPartner = true
                    break;
                default:
                    // code block
            }
        },
        startOrderAdd(){
            this.startFlowAt += 1
        },
        bindData(){
            this.g = new generalSettingModel(JSON.parse(localStorage.getItem(instituteId + 'commRSetting')))
            this.customer = new CustomerModel(this.g.defaultCustomer)
            this.checkOtherFunction()
            this.startOrder()
            this.bindItems()
            this.bindCategory()
            this.loadPriceLevel(2)
        },
        checkOtherFunction(){
            this.g.otherFunction.forEach(e => {
                switch(e.id) {
                    case 'reward':
                        this.func.reward = true
                        break;
                    case 'promotion':
                        this.func.promotion = true
                        break;
                    case 'parksale':
                        this.func.parksale = true
                        break;
                    case 'invoice':
                        this.func.invoice = true
                        break;
                    case 'note':
                        this.func.note = true
                        break;
                    case 'delivery':
                        this.func.delivery = true
                        break;
                    case 'resetOrder':
                        this.func.resetOrder = true
                        break;
                    case 'splitInv':
                        this.func.splitInv = true
                        break;
                    case 'clearOrder':
                        this.func.clearOrder = true
                        break;
                    case 'saleUnit':
                        this.func.saleUnit = true
                        break;
                    case 'countGuest':
                        this.func.countGuest = true
                        break;
                    case 'mergeInv':
                        this.func.mergeInv = true
                        break;
                    case 'orderList':
                        this.func.orderList = true
                        break;
                    case 'orderType':
                        this.func.orderType = true
                        break;
                    default:
                        break;
                }
            })
        },
        bindCategory(){
            this.categories = this.g.usedCategory
            this.cateGroup = JSON.parse(localStorage.getItem(instituteId + 'commRCateGroup'))
            this.subGroup = JSON.parse(localStorage.getItem(instituteId + 'commRSubGroup'))
        },
        bindItems(){
            // items
            let item = JSON.parse(localStorage.getItem(instituteId + 'commRProduct'))
            let itemPrice = JSON.parse(localStorage.getItem(instituteId + 'commRProductPrice'))
            this.items = []
            if(item.length > 0){
                let myarray = []
                this.g.usedCategory.forEach(e => {
                    myarray.push(e.id)
                })
                item.forEach(e => {
                    if($.inArray(e.categoryId, myarray) != -1) {
                        let tod = new Date().getTime()
                        let itp = itemPrice.filter((o) => {
                            return o.itemId == e.pk && this.g.defaultPriceLevel == o.priceLevel.id && new Date(o.appliedDate).getTime() <= tod
                        })
                        let cate = this.g.usedCategory.filter((a) => {
                            return a.id == e.categoryId
                        })
                        if(itp.length > 0){
                            this.items.push({
                                id: e.pk,
                                name: e.name,
                                sku: e.sku,
                                saleDescription: e.saleDescription,
                                price: e.price,
                                categoryId: e.categoryId,
                                category: cate[0],
                                borderColor: 'border: 3px solid ' + cate[0].color,
                                titleColor: 'background-color: ' + cate[0].color,
                                groupId: e.group.id,
                                subGroupId: e.subGroup.id,
                                img: e.thumb != '' ? 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/' + e.thumb : './images/default.png',
                                uom: itp,
                                item: e,
                            })
                        }
                    }
                })
                window.console.log(this.items, 'item')
            }
            this.isshowItem()
        },
        checkOrderFlow(){
            // check order flow
            window.console.log(this.g, 'setting')
            if(this.g.allowOrderFlow == true){
                this.startOrderFlow()
            }
        },
        //product
        addItem(item){
            let itemLine = new ItemLineModel({})
            itemLine.id = itemLinePrefix + uuid.v1();
            itemLine.decimalFormat = "n" + this.saleFormContent.decimal;
            itemLine.isEditable = true;
            let total = this.lineDS.length
            if (total < 36) {
                itemLine.description = item.saleDescription ? item.saleDescription : item.name
                itemLine.buom = item.uom
                itemLine.uom = item.uom[0]
                let amount = parseFloat(itemLine.uom.price) * parseFloat(itemLine.qty)
                let xAmount = amount * parseFloat(this.invoice.txnRate)
                itemLine.price = parseFloat(itemLine.uom.price)
                itemLine.amount = amount
                itemLine.exchangeAmount = xAmount
                itemLine.item = item.item
                window.console.log(itemLine, 'itemline')
                this.lineDS.push(itemLine)
                this.autoCalculate()
            }
            // this.lineDS.push({
            //     itemId: item.id,
            //     amount: item.price,
            //     price: item.price,
            //     qty: 1,
            //     description: item.saleDescription ? item.saleDescription : item.name,
            //     uom: item.uom,
            //     discount: 0,
            //     employees: [],
            //     modifier: [],
            // })
        },
        // line
        lineChange(){
            let grid = kendo.jQuery("#lineDS").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            // window.console.log(selectedItem, 'select item')
            this.selectItem = selectedItem
        },
        // sale form content
        async loadSaleFormContent() {
            saleFormContentHandler.list().then((res) => {
                if (res.data.statusCode === 200) {
                    const data = res.data.data;
                    if (data.length > 0) {
                        this.saleFormContent = data[0]
                    }
                }
            })
        },
        async loadAccount() {
            accountHandler.getAll().then((res) => {
                this.showLoading = false;
                //Receivable Account
                this.coa = res.data || [];
                this.receivableAcc = this.coa
                .filter((m) => m.account_type.number === 7)
                .map((itm) => {
                    return {
                    id: itm.uuid,
                    uuid: itm.uuid,
                    name: itm.name,
                    local_name: itm.local_name,
                    number: itm.number,
                    is_taxable: itm.is_taxable,
                    banhjiAccCode: itm.banhjiAccCode,
                    group_code: itm.group_code,
                    parent_account: itm.parent_account,
                    type_code: itm.type_code,
                    account_type: itm.account_type,
                    };
                });
                if (this.receivableAcc.length > 0) {
                    this.invoice.receivableAcc = this.receivableAcc[0];
                }
            });
        },
        removeRow(e) {
            e.preventDefault();
            const grid = kendo.jQuery("#lineDS").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            dataSource.remove(dataItem);
            this.removeLine(dataItem)
            setTimeout(() => {
                this.autoCalculate();
            }, 500)
        },
        removeLine(ritm) {
            let index = 0, i = 0
            this.lineDS.forEach(e => {
                if(e.id == ritm){
                    index = i
                }
                i++
            })
            this.lineDS.splice(index, 1);
        },
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        Parksale: () => import("../Parksale.vue"),
        InvoiceReport: () => import ("../InvoiceReport"),
        OrderReport: () => import ("../OrderReport"),
        Drag,
        DropList,
    },
    computed:{
        lang() {
            return "/" + i18n.locale;
        },
    },
    created: async function () {
        let d = localStorage.getItem(instituteId + 'commRActiveDate');
        if(d != null){
            if(d != new Date().toISOString().substr(0, 10)){
                this.pullData()
            }else{
                this.bindData()
            }
        }else{
            this.pullData()
        }
        await this.loadSaleFormContent()
        await this.loadAccount()
    },
    
};
</script>
<style scoped>
    #pin > .theme--light.v-input input {
        max-height: 32px;
        font-size: 2rem !important;
        text-align: center;
    }
    .v-image__image--cover {
        background-size: contain;
        margin-top: 5px;
    }
    .v-image__image {
        background-position: top center !important;
    }
    .b-cash:before {
        color: #ffffff;
    }   
    .b-loyalty:before {
        content: "\e91b";
        color: #ffffff;
    }
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
        font-size: 20px;
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
        -ms-flex: 0 0 12.666667%;
        flex: 0 0 12.666667%;
        max-width: 12.666667%;
    }
    .sidebar-left2{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 38.666667%;
        flex: 0 0 38.666667%;
        max-width: 38.666667%;
    }
    .sidebar-left3{
    -webkit-box-flex: 0;
    -ms-flex: 0 0 7.000000%;
    flex: 0 0 7.000000%;
    max-width: 7.000000%;
    }
    .container h2 {
        font-size: 17px;
        margin-bottom: 0;
    }
    .btn-sidebar{
        justify-content: space-between !important;
        background-color: #fff !important;
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
        min-width: 22% !important;
        height: 50px !important;
        padding: 10px !important;
        margin: 5px;
    }
    .apply-btn{
        min-width: 33% !important;
        height: 50px !important;
        padding: 5px !important;
        margin: 5px;
    }
    .calculator-btn{
       min-width: 18% !important;
        margin: 4px;
        padding: 0 10px !important;
    }
    .calculator-btn-1{
        min-width: 20% !important;
        margin: 4px;
        padding: 0 2px !important;
        font-size: 13px !important;
        letter-spacing: inherit;
        font-weight: bold;
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
        display: flex;
        justify-content: space-between;
    }
    .function_content {
        padding: 0px;
        border-bottom: none !important;
        background-color: #f8f8f9;
    }
    .notification{
        background-color: #ed263a;
        width: auto;
        margin-left: 2px;
        color: #fff;

    }
    .v-btn.v-size--default {
        font-size: 1.2rem;
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
    .letter_spacing{
        letter-spacing:initial;
        font-size: 12px !important;
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
    .td-invioce td{
        border: thin solid rgba(0, 0, 0, 0.12);
    }
    .tb-pong td{
        border-bottom: none !important;
        height: 25px !important;
    }
    .th-invoice th{
      border-top: thin solid rgba(0, 0, 0, 0.12) !important;  
    }
    .v-list-item-left {
        padding: 0 0px 0 16px !important;
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