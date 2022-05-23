<template>

    <v-container fluid class="sale-container py-0">
        <v-row>
            <v-col sm="12" cols="12" class="">
                <v-card color="#f8f8f9" class="pa-0 no_border" elevation="0">
                    <v-row>
                        <v-col sm="6" cols="6" class="py-0">
                            <div class="d-flex flex-column" style="height: 98vh;background-color: #ffff;">
                                <div sm="12" cols="12" class=" flex-1">
                                     <SaleTransaction/>
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
                                <div sm="12" cols="12" class="">
                                    <Calculator/>
                                </div>
                            </div>
                               
                        </v-col>
                        <v-col sm="5" cols="5" class="" style="overflow-y: auto;">
                            <v-row>
                                <v-col sm="12" cols="12" class="py-0">
                                    <v-card flat height="98vh" class="card-item" style=""> 
                                        <v-card-text class="pa-0">
                                            <ItemsList/>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col sm="1" cols="1" class="pa-0 pl-4">
                            <v-card flat  height="98vh" color="">
                                <v-btn class=" rounded-0  btn-right" icon @click="toggle">
                                    <i
                                        
                                        :class="[fullscreen ? 'b-mini' : 'b-full']"
                                    />
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <i  class=" b-product" />
                                    <h6>{{$t('categories')}}</h6>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <i  class=" b-product" />
                                     <h6>{{$t('group')}}</h6>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <i  class=" b-product" />
                                     <h6>{{$t('sub_group')}}</h6>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <i  class=" b-product" />
                                     <h6>{{$t('favorite')}}</h6>
                                </v-btn>
                                <v-btn class=" rounded-0  btn-right" style="">
                                    <i  class=" b-product" />
                                     <h6>{{$t('items')}}</h6>
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
        SaleTransaction: () => import('./SaleTransaction'),
        ItemsList: () => import('./ItemsList'),
        // ParkSaleReport: () => import('./ParkSaleReport'),
        Calculator: () => import('./Calculator'),
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
       font-family: "Niradei-light", serif !important;
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
    

</style>