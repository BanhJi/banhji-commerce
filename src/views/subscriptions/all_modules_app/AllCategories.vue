<template>
    <v-row>
        <v-col sm="12" cols="12" class="pb-0">
            <h2>{{$t('all_categories')}}</h2>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg" routed link to="banhji_smp">
                <v-img width="150" src="@/assets/images/smp.png" />
                <p class="mb-2 text-bold">{{$t('tax_financial_report')}}</p>
                <p>{{$t('cambodia_tax_financial')}}</p>
            </v-card>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg" routed link to="banhji_post">
                <v-img width="150" src="@/assets/images/pos.png"/>
                <p class="mb-2 text-bold">{{$t('for_retail_wholesale')}}</p>
                <p>{{$t('point_of_sale_desc')}}</p>
            </v-card>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg" routed link to="banhji_smp">
                <v-img width="150" src="@/assets/images/pos.png"/>
                <p class="mb-2 text-bold">{{$t('for_retail_wholesale')}}</p>
                <p>{{$t('point_of_sale_desc')}}</p>
            </v-card>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg">
            </v-card>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg">
            </v-card>
        </v-col>
        <v-col sm="4" cols='12'>
            <v-card outlined dense class="pa-5 no_border" height="200px" color="grayBg">
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    // import {i18n} from '@/i18n'
 
    export default {
        components: {},
        data: () => ({
         

        }),
        mounted() {
        },
        computed: {
      
        },
    };
</script>
<style scoped>
.progress {
  margin: 0px 0px;
  padding:0;
  width:100%;
  height:30px;
  overflow:hidden;
  background:#e2f0d9;
  border-radius:6px;
}

.bar {
  position:relative;
  float:left;
  min-width:1%;
  height:100%;
  background:#385723;
}
.lightBlue1{
    color: #0eb6f1;
    text-decoration: none;
}
</style>