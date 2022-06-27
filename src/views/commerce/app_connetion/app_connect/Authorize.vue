<template>
    <v-row>
        <v-col cols="12" class="pt-5">
            <h1 class="primary--text niradie_heavy">{{$t(types)}}</h1>
            <div class="d-flex mx-4 mt-4">
                    <div class="boxCard">
                    <img class="logoImg" :src="authorize.image" />
                </div>
                <div class="ml-4">
                    <p class="mt-4">By clicking <span class="text-bold"> Authorize</span>, you agree to provide us the consent to enable the selected application to access and update your customer information, invoices data and transactions, and credit memo</p>
                    <v-btn @click="authorizeNext" color="primary" class="text-capitalize text-bold">Authorize</v-btn>
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
        props:['authorize','types'],
        data: () =>({
            showLoading: false,
         

        }),
        methods: {
            authorizeNext(){
                this.$emit('authorizeNext');
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
        width: 300px;
        height: 300px;
        border-radius: 8px;  
        margin-right: 12px;
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