<template>
    <v-row>
        <v-col cols="12" class="pb-0 pt-5">
            <v-row>
                <v-col sm="12" cols="12" class="py-0">
                    <h2 class="primary--text font_20 mb-0">{{$t('connect_partner_app')}}</h2>
                    <p>{{$t("to_increase_sale")}}</p>
                </v-col>
                <v-col sm="12" cols="12" class="pt-10">
                    <p class="mb-1 mt-3">{{$t('p_select_type_service')}}</p>
                    <v-row>
                        <v-col sm="6" cols="12" >
                            <v-card elevation="0" @click="selectType('education')"  color="primary" :class="type == 'education' ? 'activeType white--text pa-4' : 'not-active white--text pa-4'">
                                <h1 class="text-center">{{$t('education')}}</h1>
                            </v-card>
                            <p class="mb-1 mt-2">{{$t('edu_desc')}}</p>
                        </v-col>
                           <v-col sm="6" cols="12" >
                                <v-card elevation="0"  color="primary" @click="selectType('e-commerce')" :class=" type == 'ecommerce' ? 'activeType white--text pa-4' : 'not-active white--text pa-4'" >
                                    <h1 class="text-center">{{$t('e-commerce')}}</h1>
                                </v-card>
                                <p class="mb-1 mt-2">{{$t('app_ecomerce_desc')}}</p>
                            </v-col>
                    </v-row>
                </v-col>
            </v-row>
                 <p class="text-center privacy mb-0 mt-10">
                    <v-icon size="13" class="third--text mr-2 black--text">mdi-key</v-icon>
                    {{ $t('at_banhJi_the_privacy') }}
                </p>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
    </v-row>
</template>
<script>


    export default {
        props:['types'],
        data: () =>({
            showLoading: false,
            type: ''
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods:{
            selectType(type){
              this.type = type;
              this.$emit("next",type)
            }
        },
        mounted: async function (){

        },
    }
</script>
<style scoped>
    .privacy{
        position: absolute;
        bottom: 20px;
        left: 10%;
        width: 100%;
    }
    .grayBg{
        background-color: #F8F8F9;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }
    .activeType{
        box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75) !important;
        -webkit-box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75)  !important;
        -moz-box-shadow: 0px 1px 16px 5px rgba(161,161,161,0.75)  !important;
    }
    p{
         font-family: "Niradei-Light" !important; 
    }

</style>