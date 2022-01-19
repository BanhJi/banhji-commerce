<template>
    <v-row>
        <v-col cols="12" class="pt-5">
            <h1 class="primary--text niradie_heavy">{{$t(types)}}</h1>
            <p class="mt-2 mb-1">{{$t('edu_partner_desc1')}} <span class="text-bold">{{$t('edu_partner_desc2')}}:</span></p>
             <div class="flex_wrap">
                <div @click="appSelected(item)" v-for="item in items" :key="item.id" class="boxCard">
                    <img class="logoImg" :src="item.image" />
                </div>
            </div>
            <p class="text-center privacy mb-0 mt-12">
                <v-icon size="13" class="third--text mr-2 black--text">mdi-key</v-icon>
                {{ $t('at_banhJi_the_privacy') }}
            </p>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"  type="loading"/>
    </v-row>
</template>
<script>

    export default {
        props:['partners','types'],
        data: () =>({
            showLoading: false,
            items: [
                {
                    id: 1,
                    image: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/bank/camIS.png'
                },
          

            ]

        }),
        methods: {
            appSelected(item){
                this.$emit('partnerNext',item);
            }
        },
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
 
    }
</script>
<style scoped>
    .grayBg{
        background-color: #F8F8F9;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }
    p{
         font-family: "Niradei-Light" !important; 
    }
    .boxCard{
        width: 130px;
        height: 130px;
        border: 2px solid #9c9c9c;  
        border-radius: 8px;  
        margin-right: 12px;
        padding: 10px;
        margin-top: 12px;
    }
    .flex_wrap{
        display: flex;
        flex-wrap: wrap;
    }
    .logoImg{
        width: 100%;
    }
    .privacy{
        position: absolute;
        bottom: 20px;
        left: 7%;
        width: 100%;
    }
        
</style>