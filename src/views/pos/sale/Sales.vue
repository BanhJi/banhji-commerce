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

    export default {
        data: () => ({
            isHide: false,
            fullscreen: false,

        }),
        methods: {
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
            
           
        },
        components: {
            SaleTransaction: () => import('./SaleTransaction'),
            ItemsList: () => import('./ItemsList'),
            // ParkSaleReport: () => import('./ParkSaleReport'),
            Calculator: () => import('./Calculator'),



        },
        created: async function () {
           
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
    

</style>