<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{$t('connect_apps')}}</h2>
                                <v-icon
                                    @click="close()"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <div class="function_content">
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-row>
                                                <v-col sm="2" cols="12" >
                                                    <v-row>
                                                        <v-col sm="12" class="align-center justify-center d-flex ">
                                                            <div>
                                                                <v-card @click="ClickSteps(1)" width="44" height="44" outlined dense :color="activeColor1" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                                    <h3 class="mt-2 white--text" style="font-size: 24px">1</h3>
                                                                </v-card>
                                                                <p class="text-uppercase mt-2">{{$t('type')}}</p>
                                                            </div>
                                                        </v-col>
                                                        <v-col sm="12" class="align-center justify-center d-flex ">
                                                            <div>
                                                                <v-card @click="ClickSteps(2)" width="44" height="44" outlined dense :color="activeColor2" class="pointer ml-4 no_border align-center justify-center d-flex rounded-circle ">
                                                                    <h3 class="mt-2 white--text" style="font-size: 24px">2</h3>
                                                                </v-card>
                                                                <p class="text-uppercase mt-2">{{$t('partners')}}</p>
                                                            </div>
                                                        </v-col>
                                                        <v-col sm="12" class="align-center justify-center d-flex ">
                                                            <div>
                                                                <v-card @click="ClickSteps(3)" width="44" height="44" outlined dense :color="activeColor3" class="pointer ml-5 no_border align-center justify-center d-flex rounded-circle ">
                                                                    <h3 class="mt-2 white--text" style="font-size: 24px">3</h3>
                                                                </v-card>
                                                                <p class="text-uppercase  mt-2">{{$t('authorize')}}</p>
                                                            </div>
                                                        </v-col>
                                                        <v-col sm="12" class="align-center justify-center d-flex ">
                                                            <div>
                                                                <v-card @click="ClickSteps(4)" width="44" height="44" outlined dense :color="activeColor4" class="pointer ml-2 no_border align-center justify-center d-flex rounded-circle ">
                                                                    <h3 class="mt-2 white--text" style="font-size: 24px">4</h3>
                                                                </v-card>
                                                                <p class="text-uppercase mt-2">{{$t('setting')}}</p>
                                                            </div>
                                                        </v-col>
                                                    </v-row> 
                                                </v-col>
                                                 <v-col sm="10" cols="12" class="pa-6" >
                                                      <div v-show="steps==1">
                                                            <Type @next="nextStpes($event, 1)" ref="type" />
                                                        </div>
                                                        <!-- Steps 2 Adjustemnt -->
                                                        <div  v-show="steps==2">
                                                            <Partners :types="typeApp"  @partnerNext="nextStpes($event,2)"  ref="partners"/>
                                                        </div>
                                                        <!-- Steps there -->
                                                        <div  v-show="steps==3">
                                                            <Authorize  :authorize="authorize" @authorizeNext="nextStpes($event,3)" :types="typeApp" ref="authorize"/>
                                                        </div>
                                                        <!-- Steps four -->
                                                        <div  v-show="steps==4">
                                                            <Settings  :types="typeApp"  ref="setting" />
                                                        </div>
                                                            </v-col>
                                                        </v-row>
                                                
                                                        <!-- <v-divider/> -->
                                                        <!-- Body function to input -->
                                          
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>
                            <!-- <div class="function_footer">
				
                                <v-btn @click="close" class="float-left  btn_cancel">{{$t('cancel')}}</v-btn>
                                <v-btn class="float-right btn_save_close" @click="nextStpes()" >{{$t(save_next)}}</v-btn>
                            </div> -->
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="true"
                    :myLoading="true"
                />
        </v-container>
    </v-app>
</template>

<script>
    import {i18n} from '@/i18n';
    import LoadingMe from '@/components/Loading'
    import Type from './app_connect/Type'
    import Partners from './app_connect/Partners'
    import Authorize from './app_connect/Authorize'
    import Settings from './app_connect/Settings'
    export default {
        name: "AddProduct",
        components:{
            'LoadingMe': LoadingMe,
            Type,
            Partners,
            Authorize,
            Settings
		},
        data: () => ({
            templates:[],
            showLoading:false,
            valid: '',
            bill_date: "",
            journal_date: '',
            steps: 1,
            reachTopStep: 0,
            check: false,
            save_next: 'save_next',
            activeColor1: "primary",
            activeColor2: "third",
            activeColor3: "third",
            activeColor4: "third",
            isFinal : false,
            // greyText
            check1: false,
            check2: false,
            check3: false,
            typeApp: '',
            authorize: ''

        }),
        methods:{
            nextStpes(e,type){
                window.console.log(e)
                if(type == 1){
                    this.typeApp = e;
                }else if (type == 2){
                    this.authorize = e
                }
                if(this.steps ==4) {
                    return
                }
                this.steps += 1;
                this.reachTopStep = this.steps
                this.stepsCondition(this.steps)
            },
            ClickSteps(step){
                if(this.steps == step){
                    return
                }
                if(step > this.reachTopStep){
                    return
                }
                if(step != 4){
                    this.save_next =  "confirm_next"
                }else{
                    this.save_next = "confirm_close"
                }
                this.steps = step
                this.stepsCondition(this.steps)
            },
            stepsCondition(val){
                switch(val){
                    case 1: 
                        this.activeColor1= "primary"
                        this.activeColor2= "third"
                        this.activeColor3= "third"
                        this.activeColor4= "third"
                        break
                    case 2: 
                        this.activeColor1= "third"
                        this.activeColor2= "primary"
                        this.activeColor3= "third"
                        this.activeColor4= "third"
                        break
                    case 3: 
                        this.activeColor1= "third"
                        this.activeColor2= "third"
                        this.activeColor3= "primary"
                        this.activeColor4= "third"
                        break
                    default: 
                        this.activeColor1= "third"
                        this.activeColor2= "third"
                        this.activeColor3= "third"
                        this.activeColor4= "primary"
                        this.isFinal = true
                        this.save_next = "confirm_close"
                  }
            },

            close(){
                this.$swal({
                    title: i18n.t('msg_title_warning'),
                    text: i18n.t('msg_discard'),
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonText: i18n.t('cancel'),
                    confirmButtonColor: "#4d4848",
                    cancelButtonColor: "#ED1A3A",
                    confirmButtonText: i18n.t('discard'),
                }).then((result) => {
                    window.console.log(result);
                    // if (result.value) {
                        
                    // }
                });
            }
        },
        mounted(){

        },
        watch: {
            '$route': 'loadPayrollList'
        }
    }

</script>

<style scoped>
    .function_content {
     
        border-bottom: 0;
        background-color: #fff !important;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }
    .grayBg{
        background-color: #f3f8ff;
    }
    @media (max-width: 576px) {
        .mb-6 {
            margin-bottom: 0 !important;
        }
    }
 
    .border_grey{
         border: 1px solid #d6d7d8;
    }
    .attachment_table{
        width:100%;
    }
    
    .my_checkbox input[type=checkbox] + label {
        display: grid;
        grid-template-columns: 20% 80%;
        margin: 0.2em 0px;
        cursor: pointer;
        line-height: 16px;
        padding: 0.2em;
    }
</style>