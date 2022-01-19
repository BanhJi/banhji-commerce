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
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <v-row>
                                    <v-col sm="10" cols="10" class="pa-0">
                                        <v-row>
                                            <v-col sm="3" cols="12" class="py-0">
                                                <h2 class="mb-0">
                                                    <v-img width="180" src="@/assets/images/pos.png"/>
                                                </h2>
                                            </v-col>
                                            <v-col sm="6" cols="12"  class="py-0 pl-0">
                                                <p class="text-bold mb-0">{{$t('for_retail_wholesale')}}</p>
                                                <p class="mb-0">{{$t('point_of_sale_desc')}}</p>
                                            </v-col>
                                            <v-col sm="3" cols="12"  class="py-0">
                                                <v-btn color="primary" class="text_initial white--text ">{{$t('get_this_app')}}</v-btn>
                                            </v-col>
                                        </v-row>
                                 
                                    </v-col>
                                    <v-col sm="2" cols="2" class="pa-0">
                                        <v-icon
                                                onclick="window.history.go(-1); return false;"
                                                style="cursor: pointer; color: #333; font-size: 26px;"
                                                class="float-right pt-2 pr-2"
                                        >close
                                        </v-icon>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="px-3 no_border" color="grayBg">
                                <v-row>
                                    <v-col sm="9" cols="12">
                                        <h3 class="font_22 mb-4">{{$t('key_benefits')}}</h3>
                                        <p class="mb-0">{{$t('point_of_sale_desc')}}</p>
                                        <ul class="mb-4">
                                            <li>{{$t('point_of_sale_desc')}}</li>
                                            <li>{{$t('point_of_sale_desc')}}</li>
                                            <li>{{$t('point_of_sale_desc')}}</li>
                                        </ul>
                                        <v-row>
                                            <v-col sm="12" cols="12" style="position: relative;">
                                                <v-img class="default_img" :src="'http://i3.ytimg.com/vi/'+video_id+'/maxresdefault.jpg'" />
                                                <i  @click="play" class=" play fas fa-play-circle"></i>
                                            </v-col>
                                            <v-col sm="3" cols="4">
                                                  <v-img @click="selectVideo('FB4oKsuQnco')"  src="http://i3.ytimg.com/vi/FB4oKsuQnco/maxresdefault.jpg" />
                                            </v-col>
                                            <v-col sm="3" cols="4">
                                                  <v-img @click="selectVideo('sGg64n0UAk4')" src="http://i3.ytimg.com/vi/sGg64n0UAk4/maxresdefault.jpg" />
                                            </v-col>
                                            <v-col sm="3" cols="4">
                                                <v-img @click="selectVideo('kGhXHpqJOXI')" src=" http://i3.ytimg.com/vi/kGhXHpqJOXI/maxresdefault.jpg" />
                                            </v-col>
                                            <v-col sm="3" cols="4">
                                                <v-img @click="selectVideo('YEmj5cBE9cs')" src="http://i3.ytimg.com/vi/YEmj5cBE9cs/maxresdefault.jpg" />
                                            </v-col>
                                        </v-row>
                                        <v-dialog v-model="dialogm2" :persistent="true" max-width="560px">
                                            <v-card>
                                                <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+video_id" 
                                                        frameborder="0" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowfullscreen></iframe>
                                                <v-icon class="btn_close" @click="CloseModal">close</v-icon>
                                            </v-card>
                                            
                                        </v-dialog>
                                    </v-col>
                                    <v-col sm="3" cols="12">
                                        <h3 class="mb-6">{{$t('app_information')}}</h3>

                                        <h4 class="text-bold">{{$t('developer')}}</h4>
                                        <p>Banhji</p>

                                        <h4>{{$t('categories')}}</h4>
                                        <p>Point of sale</p>
                                        <p>Industry Specific</p>

                                        <h4 class="text-bold">{{$t('legal')}}</h4>
                                        <p>Term and Conditions</p>

                                        <h4 class="text-bold">{{$t('contact')}}</h4>
                                        <p>Phone:</p>
                                        <p>Email</p>

                                        <h4 class="text-bold">{{$t('support')}}</h4>
                                        <p>Link</p>

                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mb-3"/>
                            <div>
                                <v-row>
                                    <v-col sm="6" cols="6" class="py-0 text-left">
                                        <v-btn
                                                color="black"
                                                outlined
                                                class=" text-capitalize  black--text float-left"
                                                @click="dialogm2 = false"
                                        >{{ $t("cancel") }}
                                        </v-btn
                                        >
                                    </v-col>
                                    <!-- <v-col sm="6" cols="6" class="py-0 text-right">
                                        <v-btn
                                                color="primary"
                                                class="px-3  white--text text-capitalize"
                                        >{{ $t("save_close") }}
                                        </v-btn>
                                    </v-col> -->
                                </v-row>
                            </div>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>
    // import kendo from '@progress/kendo-ui'
    import LoadingMe from "@/components/Loading";
    // import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    export default {
        name: "AddProduct",
        components: {
            LoadingMe: LoadingMe,
            // 'app-datepicker' : DatePickerComponent,
        },
        data: () => ({
            showLoading: false,
            dialogm2: false,
            valid: true,
            video_id: "FB4oKsuQnco"
        }),
        methods: {
            play(){
                this.dialogm2 = true
            },
            selectVideo(id){
                this.video_id = id
            },
            CloseModal(){
                if(this.video_id === "FB4oKsuQnco"){
                    this.video_id ="sGg64n0UAk4"
                }else{
                    this.video_id = "FB4oKsuQnco"
                }
                this.dialogm2 = false
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

    .play{
        position: absolute;
        top: 40%;
        font-size: 80px;
        left: 41%;
        cursor: pointer
    }
    .default_img{
        opacity: 0.5;
    }
    .btn_close{
        color: #000;
        background: rgb(27 194 17 / 30%);
    }
</style>
