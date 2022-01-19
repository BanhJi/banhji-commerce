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
                                <h2 class="mb-0">{{$t('bank_payment')}}</h2>
                                <v-icon
									@click="close()"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-row>
                                <v-col sm="12" cols="12">
                                    <div class="function_content">
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-row>
                                                <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(1)" width="44" height="44" outlined dense :color="activeColor1" class="pointer  m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">1</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('input')}}</p>
                                                    </div>
                                                </v-col>
                                                 <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(2)" width="44" height="44" outlined dense :color="activeColor2" class="pointer m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">2</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('review')}}</p>
                                                    </div>
                                                </v-col>
                                                <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(3)" width="44" height="44" outlined dense :color="activeColor3" class="pointer m_auto  no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">3</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('confirm')}}</p>
                                                    </div>
                                                </v-col>
                                            </v-row> 
                                            <v-divider/>
                                            <!-- Body function to input -->
                                            <div v-show="steps==1">
                                                 <Input ref="input" @headline="refresh" :propInput="propInput"/>
                                            </div>
                                            <!-- Steps 2 Adjustemnt -->
                                            <div v-show="steps==2">
                                                <Review ref="review" @headline="refresh" :batchreview="batch"/>
                                            </div>
                                            <!-- Steps there -->
                                            <div v-show="steps==3">
                                                <Confirm ref="confirm" @headline="refresh" :batch="batch"/>
                                            </div>
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="function_footer">
								<!-- Warning Message -->
                                <v-btn class="float-left  btn_cancel" @click="close()">{{$t('cancel')}}</v-btn>
                                <v-btn class="float-right btn_save_close" @click="saveSpets()" >{{$t(save_next)}}</v-btn>
                                <v-btn v-if="steps != 1" class="float-right mx-3 capitalize white--text" color="primary">{{$t('print_preview')}}</v-btn>
                                 <v-btn v-if="steps === 2" class="float-right mx-3 capitalize white--text" @click="handleDownload()" color="primary">{{$t('dowload_excel')}}</v-btn>
                                <v-btn v-else class="float-right mx-3 capitalize white--text" color="primary">{{$t('save_draft')}}</v-btn>
                            </div>
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
    const payrollHandler = require("@/scripts/payrollHandler")
    export default {
        name: "BankPayment",
        components:{
            'LoadingMe': LoadingMe,
            Input: () => import('./bank_payment/Input'),
            Review: () => import('./bank_payment/Review'),
            Confirm: () => import('./bank_payment/Confirm')
		},
        data: () => ({
            templates:[

            ],
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
            // third
            check1: false,
            check2: false,
            check3: false,
            payroll_id: '',
            loadPayrolls: [],
            batch: {
                id: '00001'
            },
            clickSteps: 0,
            propInput: 'propInput',
        }),
        methods:{
            refresh(data){
                if(data === 201){
                    this.loadBatchSingle()
                }
            },
            saveSpets(){
                if(this.clickSteps > 0 ){
                    if(this.clickSteps === 1){
                        this.$refs.input.saveSpets()
                        this.clickSteps = 0
                    }else if(this.clickSteps === 2){
                        this.$refs.review.saveSpets()
                        this.clickSteps = 0
                    }else if(this.clickSteps === 3){
                        this.$refs.confirm.saveSpets()
                    }
                }else{
                    if(this.steps === 1){
                        this.$refs.input.saveSpets()
                    }else if(this.steps === 2){
                        this.$refs.review.saveSpets()
                    }else if(this.steps === 3){
                        this.$refs.confirm.saveSpets()
                    }
                }
            },
            nextStpes(){
                if(this.batch.step > 0){
                    this.steps = this.batch.step
                }
                this.steps = this.steps
                if(this.reachTopStep <= this.steps){
                    this.reachTopStep = this.steps
                }
                this.stepsCondition(this.steps)
            },
            ClickSteps(step){
                this.clickSteps = step
                if(this.steps == step){
                    return 
                }
                if(step > this.reachTopStep){
                    return
                }
                if(step != 3){
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
                        break
                    case 2: 
                        this.activeColor1= "third"
                        this.activeColor2= "primary"
                        this.activeColor3= "third"
                        break
                    default: 
                        this.activeColor1= "third"
                        this.activeColor2= "third"
                        this.activeColor3= "primary"
                        this.isFinal = true
                        this.save_next = "confirm_close"
                  }
            },
            loadBatchSingle(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                let result = res.data
                                this.batch = result[0]
                                this.nextStpes()
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
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
                    if (result.value) {
                        if(this.steps === 1){
                            this.$refs.input.goBack()
                        }else if(this.steps === 2){
                            this.$refs.review.goBack()
                        }else if(this.steps === 3){
                            this.$refs.confirm.goBack()
                        }
                    }
                });
            },
            handleDownload(){
                 this.$refs.review.download()
            }
        },
        async mounted(){
            await this.loadBatchSingle()
        },
        watch:{
            '$route': 'loadBatchSingle'
        }
    }

</script>

<style scoped>
    .function_content {
        padding: 0 25px 25px;
        border-bottom: 0;
        background-color: #fff !important;
    }
    .m_auto{
        margin: auto;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }
    .grayBg{
        background-color: #F8F8F9;
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