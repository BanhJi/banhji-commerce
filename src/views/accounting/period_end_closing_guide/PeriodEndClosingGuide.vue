<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                            outlined
                            dense
                            class="pa-4 no_border rounded-sm"
                            color="white"
                    >
                        <v-card outlined dense class="no_border">
                            <h2 class="mb-0">{{ $t("period_end_closing_guide") }}</h2>
                            <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                            >close
                            </v-icon>
                        </v-card>
                        <v-card outlined dense class="px-3 no_border" color="white">
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col sm="8" cols="12" class="py-0">
                                        <v-row>
                                            <v-col sm="5" cols="12" class="pr-0 pt-5 pb-0">
                                                <label width="50" class="label">
                                                    {{$t("please_select_month_of_")}}
                                                </label>
                                            </v-col>
                                            <v-col sm="6" cols="12" class="pl-0 pb-0">
                                                <app-datepicker
                                                        :initialDate="date"
                                                        @emitDate="date = $event"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                        <div>
                                            <v-card class="no_border align-center justify-center d-flex">
                                                <v-card @click="ClickSteps(1)" width="44" height="44" outlined dense :color="activeColor1" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                    <h3 class="mt-2 white--text" style="font-size: 24px">1</h3>
                                                </v-card>
                                            </v-card>
                                            <p class="text-uppercase mt-2  text-center mb-0">{{$t('changes')}}</p>
                                        </div>
                                    </v-col>
                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                        <div>
                                            <v-card class="no_border align-center justify-center d-flex">
                                                <v-card @click="ClickSteps(2)" width="44" height="44" outlined dense :color="activeColor2" class="pointer  no_border align-center justify-center d-flex rounded-circle ">
                                                    <h3 class="mt-2 white--text" style="font-size: 24px">2</h3>
                                                </v-card>
                                            </v-card>
                                            <p class="text-uppercase mt-2  mb-0 text-center">{{$t('cash_bank')}}</p>
                                        </div>
                                    </v-col>
                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                        <div>
                                            <v-card class="no_border align-center justify-center d-flex">
                                                <v-card @click="ClickSteps(3)" width="44" height="44" outlined dense :color="activeColor3" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                    <h3 class="mt-2 white--text" style="font-size: 24px">3</h3>
                                                </v-card>
                                             </v-card>
                                            <p class="text-uppercase mt-2   mb-0 text-center">{{$t('adjustment')}}</p>
                                        </div>
                                    </v-col>
                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                        <div>
                                            <v-card class="no_border align-center justify-center d-flex">
                                                <v-card @click="ClickSteps(4)" width="44" height="44" outlined dense :color="activeColor4" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                    <h3 class="mt-2 white--text" style="font-size: 24px">4</h3>
                                                </v-card>
                                            </v-card>
                                            <p class="text-uppercase mt-2 mb-0 text-center">{{$t('review')}}</p>
                                        </div>
                                    </v-col>
                                    <v-col sm="2" class="align-center justify-center d-flex ">
                                        <div>
                                            <v-card class="no_border align-center justify-center d-flex">
                                                <v-card @click="ClickSteps(5)" width="44" height="44" outlined dense :color="activeColor5" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                    <h3 class="mt-2 mt-2  white--text" style="font-size: 24px">5</h3>
                                                </v-card>
                                            </v-card>
                                            <p class="text-uppercase mt-2  mb-0 text-center">{{$t('finalize')}}</p>
                                        </div>
                                    </v-col>
                                </v-row> 
                                <v-divider class="mb-3"/>
                                <!-- Body function to input -->
                                <div v-show="steps==1">
                                    <Change/>
                                </div>
                                <!-- Steps 2 Adjustemnt -->
                                <div v-show="steps==2">
                                    <CashBank/>
                                </div>
                                <div v-show="steps==3">
                                    <KeyAdjustment/>
                                </div>
                                <!-- Steps there -->
                                <div v-show="steps==4">
                                    <Review />
                                </div>
                                <!-- Steps four -->
                                <div v-show="steps==5">
                                    <Finalize/>
                                </div>
                            </v-form>
                        </v-card>
                        <v-divider class="mt-4"/>
                        <v-card outlined dense class="no_border  function_footer">
								<!-- Warning Message -->
                                <!-- <v-btn class="float-left  btn_cancel">{{$t('cancel')}}</v-btn> -->
                                <v-btn class="float-right white--text capitalize" color="primary" @click="nextStpes" >{{$t(save_next)}}</v-btn>
                          

                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
    // import kendo from '@progress/kendo-ui'
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    import LoadingMe from '@/components/Loading'
    import KeyAdjustment from './closing_step/KeyAdjustment'
    import Change from './closing_step/Change'
    import CashBank from './closing_step/CashBank'
    import Review from './closing_step/Review'    
    import Finalize from './closing_step/Finalize'

    export default {
        name: "PeriodAndClosing",
        components: {
            LoadingMe: LoadingMe,
            "app-datepicker": DatePickerComponent,
            KeyAdjustment,
            Change,
            CashBank,
            Review,
            Finalize
        },
        data: () => ({
            date: "",
            showLoading:false,
            steps: 1,
            reachTopStep: 0,
            valid: true,
            save_next: 'confirm_next',
            activeColor1: "primary",
            activeColor2: "greyText",
            activeColor3: "greyText",
            activeColor4: "greyText",
            activeColor5: "greyText",
            isFinal : false,
        }),
        methods: {
            nextStpes(){
                if(this.steps == 5){
                    return
                    // this.steps =0
                }
                this.steps = this.steps+1
                if(this.reachTopStep <= this.steps){
                    this.reachTopStep = this.steps
                }
                this.stepsCondition(this.steps)
            },
            ClickSteps(step){
                if(this.steps == step){
                    return
                }
                if(step > this.reachTopStep){
                    return
                }
                if(step != 5){
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
                        this.activeColor2= "greyText"
                        this.activeColor3= "greyText"
                        this.activeColor4= "greyText"
                        this.activeColor5= "greyText"
                        break
                    case 2: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "primary"
                        this.activeColor3= "greyText"
                        this.activeColor4= "greyText"
                        this.activeColor5= "greyText"
                        break
                    case 3: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "greyText"
                        this.activeColor3= "primary"
                        this.activeColor4= "greyText"
                        this.activeColor5= "greyText"
                        break
                    case 4: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "greyText"
                        this.activeColor3= "greyText"
                        this.activeColor4= "primary"
                        this.activeColor5= "greyText"
                        break
                    default: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "greyText"
                        this.activeColor3= "greyText"
                        this.activeColor4= "greyText"
                        this.activeColor5= "primary"
                        this.isFinal = true
                        this.save_next = "confirm_close"
                  }
            }
        },
    };
</script>

<style scoped>
    .function_content {
        padding: 0 25px 25px;
        border-bottom: 0;
        background-color: #fff !important;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }

    .grayBg {
        background-color: #F8F8F9;
    }

    @media (max-width: 576px) {
        ..mb-6 {
            margin-bottom: 0 !important;
        }
    }

    .theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .v-tab {
        justify-content: left;
        font-size: 16px;
    }

    .v-tabs--vertical > .v-tabs-bar .v-tab {
        height: 64px;
    }

    .tab_setting .v-tab--active {
        font-weight: 700;
        color: #000;
    }

    .v-tab--active {
        background: #F8F8F9 !important;
        border-bottom: 4px solid #F8F8F9 !important;
        border-left: none;
    }

    .v-slide-group__content {
        width: 175px !important;
        background-color: #F8F8F9 !important;
    }

    .attachment_table.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th,
    .attachment_table.v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td {
        border-right: none !important;
    }
</style>
